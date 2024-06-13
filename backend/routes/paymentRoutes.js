const express = require('express');
const { createOrder, verifyPayment ,withdrawFunds, findbalance, transaction, webhook, refund } = require('../controllers/paymentController');
const { eventsHandler } = require('../controllers/sseController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/orders',authenticate, createOrder);
router.post('/verify',authenticate, verifyPayment);
router.post('/withdraw',authenticate, withdrawFunds);
router.post('/balance',authenticate, findbalance);
router.post('/transactions',authenticate, transaction);
router.post('/refund',authenticate, refund);
router.post('/webhook', webhook);
router.get('/events', eventsHandler);

module.exports = router;