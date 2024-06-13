const Razorpay = require('razorpay');
const shortid = require('shortid');
const crypto = require('crypto');
require('dotenv').config();
const Transaction = require('../models/Transaction');
const Balance = require('../models/Balance');
const { sendEvent } = require('./sseController');

const key_id = "rzp_test_UEfJKv7WUJzZGw";
const key_secret = "BxqzcBLbOMWbAZtmut0jxYMw";

const razorpay = new Razorpay({
  key_id,
  key_secret
});
const webhookSecret = 'your_webhook_secret';

exports.createOrder = async (req, res) => {
  const { amount, currency, bidId = 'Deposit', userID: userId } = req.body;
  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
  };

  try {
    const response = await razorpay.orders.create(options);
    if (response) {
      const transaction = new Transaction({
        userId,
        date: new Date(),
        particulars: bidId,
        amount: parseInt(amount),
        razorId: response.id,
        status: 'invalid'
      });

      await transaction.save();
    }
    res.json({
      _id: response._id,
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};


exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const hash = crypto.createHmac('sha256', key_secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (hash === razorpay_signature) {
    try {

      // const transaction = await Transaction.findOne({ _id });
      // if (!transaction) {
      //   throw new Error(Transaction with Razor ID ${_id} not found);
      // }

      // transaction.status = "created";

      // await transaction.save();
      res.json({ status: 'success' });
    } catch (error) {
      console.log("error  "+error);
      res.status(500).json({ status: 'failed', error: error.message });
    }
  } else {
    res.status(400).json({ status: 'failed' });
  }
};

exports.findbalance = async (req, res) => {
  const userId = req.body.userID;
  
  if (!userId ) {
    return res.status(400).json({ status: 'failed', message: 'Invalid user' });
  }

  try {
    const balance = await Balance.findOne({ userId });
    const initialBalance = balance ? balance.amount : 0;
    res.json({ status: 'success', initialBalance});
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'failed', error: error.message });
  }
};

const updatedTransactions = (transactions) =>
      transactions
      .flat()
      .map(transaction => {
        switch (transaction.status) {
          case 'created':
          case 'authorized':
            transaction.status = 'pending';
            break;
          case 'captured':
            transaction.status = 'completed';
            break;
          case 'refund_failed':
            transaction.status = 'refund failed';
            break;
          case 'invalid':
            return null; // Mark invalid transactions to be filtered out
          default:
            break;
        }
        const { razorId, ...transactionWithoutRazorId } = transaction.toObject();
        return transactionWithoutRazorId;
      })
      .filter(transaction => transaction !== null); 

exports.transaction = async (req, res) => {
  const userId = req.body.userID;
  
  if (!userId) {
    return res.status(400).json({ status: 'failed', message: 'Invalid user' });
  }

  try {
    const transactions = await Transaction.find({ userId }).sort({ date: -1 });

    // Process transactions
    const updatedTransaction = updatedTransactions(transactions)

    res.json({ status: 'success', transactions: updatedTransaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'failed', error: error.message });
  }
};

exports.refund = async (req, res) => {
  const { _id } = req.body; // amount should be in INR (e.g., 100 for 100 INR)

  try {
    // Find the transaction by _id
    const transaction = await Transaction.findOne({ _id, particulars: 'Deposit', status: 'completed' });
    if (!transaction) {
      return res.status(404).json({ status: 'failed', message: 'Transaction not found' });
    }

    const razorId = transaction.razorId; // Get the razorId from the transaction
    const amount = transaction.amount;

    // Create a refund request
    const refundResponse = await razorpay.payments.refund(razorId, {
      amount: amount * 100, // amount in paise
    });

    res.json({ status: 'success', refund: refundResponse });
  } catch (error) {
    console.error('Error processing refund:', error);
    res.status(500).json({ status: 'failed', message: error.message });
  }
}

exports.webhook = async (req, res) => {
  const secret = webhookSecret;
  const shasum = crypto.createHmac('sha256', secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest('hex');

  if (digest === req.headers['x-razorpay-signature']) {
    const event = req.body.event;
    const payload = req.body.payload; console.log(payload);

    try {
      switch (event) {
        case 'payment.authorized':
          await handlePaymentStatus(payload.payment.entity, 'authorized');
          break;
        case 'payment.failed':
          await handlePaymentStatus(payload.payment.entity, 'failed');
          break;
        case 'payment.captured':
          await handlePaymentStatus(payload.payment.entity, 'captured');
          break;
        case 'refund.processed':
          await handleRefundStatus(payload.refund.entity, 'refunded');
          break;
        case 'refund.failed':
          await handleRefundStatus(payload.refund.entity, 'refund_failed');
          break;
        case 'refund.created':
          await handleRefundStatus(payload.refund.entity, 'refunding');
          break;
        case 'payment.dispute.created':
          await handlePaymentStatus(payload.dispute.entity, 'authorized');
          break;
        case 'payment.dispute.won':
          await handlePaymentStatus(payload.dispute.entity, 'captured');
          break;
        case 'payment.dispute.lost':
          await handlePaymentStatus(payload.dispute.entity, 'failed');
          break;
        default:
          console.log(`Unhandled event: ${event}`);
          break;
      }
      res.status(200).json({ status: 'ok' });
    } catch (error) {
      console.error('Error handling webhook:', error);
      res.status(500).json({ status: 'error', message: error.message });
    }
  } else {
    res.status(400).json({ status: 'failed', message: 'Invalid signature' });
  }
};

async function handlePaymentStatus(payment, status) {
  try {
    const { id: razorpay_payment_id, order_id: razorpay_order_id, amount } = payment;
    const transaction = await Transaction.findOne({ $or: [
      {razorId: razorpay_order_id}, 
      {razorId: razorpay_payment_id}
    ]});
    if (!transaction) {
      throw new Error(`Transaction with Razor ID ${razorId} not found`);
    }
    let userId;

    if (status === 'captured') {
      userId = transaction.userId;
      const balance = await Balance.findOne({ userId });
      const initialBalance = balance ? balance.amount : 0;
      const newBalance = initialBalance + amount / 100; // amount is in paise

      if (balance) {
        balance.amount = newBalance;
        await balance.save();
      } else {
        const newBalanceDoc = new Balance({ userId, amount: newBalance });
        await newBalanceDoc.save();
      }

      transaction.initialBalance = initialBalance;
      transaction.balanceAfter = newBalance;
    
      transaction.razorId = payment.id;
    }

    transaction.status = status;
    await transaction.save();
    sendEvent(userId, { type: 'new_transaction', data: { transaction: updatedTransactions(transaction), balance: newBalance } });
  } catch (error) {
    console.error('Error handling payment status:', error);
    throw error;
  }
}

async function handleRefundStatus(refund, status) {
  try {
    const { id: razorpay_payment_id, order_id: razorpay_order_id, amount } = refund;
    const transaction = await Transaction.findOne({ $or: [
      {razorId: razorpay_order_id}, 
      {razorId: razorpay_payment_id}
    ], particulars: 'Deposit', status: 'completed' });
    if (!transaction) {
      throw new Error(`Transaction with Razor ID ${razorId} not found`);
    }
    let userId;

    if (status === 'refunded') {
      userId = transaction.userId;
      const balance = await Balance.findOne({ userId });
      const initialBalance = balance ? balance.amount : 0;
      const newBalance = initialBalance - amount / 100; // amount is in paise

      if (balance) {
        balance.amount = newBalance;
        await balance.save();
      } else {
        const newBalanceDoc = new Balance({ userId, amount: newBalance });
        await newBalanceDoc.save();
      }

    }
      
    transaction.status = status;
    await transaction.save();
    sendEvent(userId, { type: 'new_transaction', data: { transaction: updatedTransactions(transaction), balance: newBalance } });
  } catch (error) {
    console.error('Error handling refund status:', error);
    throw error;
  }
}

exports.withdrawFunds = async (req, res) => {
  const { amount } = req.body;
  const userId = req.body.userID;

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ status: 'failed', message: 'Invalid amount' });
  }

  try {
    const balance = await Balance.findOne({ userId });
    const initialBalance = balance ? balance.amount : 0;

    if (amount > initialBalance) {
      return res.status(400).json({ status: 'failed', message: 'Insufficient balance' });
    }

    const newBalance = initialBalance - amount;

    const transaction = new Transaction({
      userId,
      date: new Date(),
      particulars: 'Withdrawal',
      amount: -amount,
      balanceInitial: initialBalance,
      balanceAfter: newBalance,
    });

    await transaction.save();

    balance.amount = newBalance;
    await balance.save();

    res.json({ status: 'success', newBalance,transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'failed', error: error.message });
  }
};