const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');

const dotenv = require('dotenv');
dotenv.config();
dotenv.config({ path: '.env.local' });

const JWT_SECRET =
  'b6c73deba6febbff82299ab18495894cdbd2ff0b4f24452b86b3b48d32fb7563'; // change this to your JWT secret and  keep it in .env file

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: 'wayne.kuhic71@ethereal.email',
    pass: 'd1yUAx9zRr9nbgj4PK',
  },
});

exports.signup = async (req, res) => {
  try {
    const { username, phone, email, password } = req.body;

    if (!username || !email || !password || !phone) {
      return res.status(400).send('All fields are required');
    }

    const user = await User.findOne({
      $or: [{ userName: username }, { email: email }, { phone: phone }],
    });

    if (user) {
      if (user.userName === username) {
        return res.status(400).send('Username already exists');
      }
      if (user.email === email) {
        return res.status(400).send('Email already exists');
      }

      if (user.phone === phone) {
        return res.status(400).send('Phone number already exists');
      }
    }

    const passwordRegExp = new RegExp('^[a-zA-Z0-9!@#$%^&*()_+]{6,50}$');
    const phoneRegExp = new RegExp('^[0-9]{10}$');
    const usernameRegExp = new RegExp('^[a-z0-9_]{3,50}$');
    const emailRegExp = new RegExp(
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'
    );

    if (!password.match(passwordRegExp)) {
      return res.status(400).send('Password must be 6 characters long');
    }

    if (!phone.match(phoneRegExp)) {
      return res.status(400).send('Phone number must be 10 digits');
    }

    if (!username.match(usernameRegExp)) {
      return res
        .status(400)
        .send(
          'Username can only contain lowercase letters, numbers, and underscores.'
        );
    }

    if (!email.match(emailRegExp)) {
      return res.status(400).send('Please enter a valid email address');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password.toString(), salt);

    const newUser = User({
      userName: username,
      email: email,
      password: hash,
      phone: phone,
    });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, userName: newUser.userName, email: newUser.email },
      JWT_SECRET,
      {
        expiresIn: '1d',
      }
    );

    var mailOptions = {
      from: 'wayne.kuhic71@ethereal.emai',
      to: email,
      subject: 'Welcome to Auction Blog',
      html: `<h1>Welcome to Auction Blog</h1><p>Thank you for signing up with us. We are excited to have you on board. You can now start bidding on your favorite items. </p> <a href="http://localhost:5000/api/auth/verify/${token}">Verfiy Link</a>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('User Created Successfully');
      }
    });

    res.status(200).send({
      user: {
        userName: newUser.userName,
        email: newUser.email,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).send('User Not Found');
    }

    if (!user.isVerified) {
      return res.status(401).send('User not verified');
    }

    const isCorrect = await bcrypt.compare(password.toString(), user.password);
    if (!isCorrect) {
      return res.status(400).send('Invalid Credentials');
    }

    const token = jwt.sign(
      { id: user._id, userName: user.userName, email: user.email },
      JWT_SECRET,
      {
        expiresIn: '1d',
      }
    );

    res.status(200).json({
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        name: user.name,
        phone: user.phone,
        address: user.address,
        pincode: user.pincode,
      },
      token,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.loginWithToken = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userID });

    if (!user) {
      return res.status(404).send('User Not Found');
    }

    const token = jwt.sign(
      { id: user._id, userName: user.userName, email: user.email },
      JWT_SECRET,
      {
        expiresIn: '1d',
      }
    );

    res.status(200).json({
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        name: user.name,
        phone: user.phone,
        address: user.address,
        pincode: user.pincode,
      },
      token,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const token = req.params.token;
    const user = jwt.verify(token, JWT_SECRET);
    const verfiy = await User.findOneAndUpdate(
      { email: user.email },
      { $set: { isVerified: true } }
    );

    if (verfiy) {
      res.status(200).send('User Verified Successfully');
    } else {
      res.status(400).send('User Verification Failed');
    }
  } catch (error) {
    console.log(error);
  }
};

exports.generateResetToken = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send('User Not Found');
    }

    const otp = Math.floor(1000 + Math.random() * 900000);

    const opt_hash = jwt.sign({ otp }, JWT_SECRET, {
      expiresIn: 10 * 60,
    });

    await User.findOneAndUpdate({ email: email }, { $set: { otp: opt_hash } });

    var mailOptions = {
      from: 'NobStash<nobstash@gmail.com>',
      to: email,
      subject: 'Reset Password OTP',
      html: `<h1>Reset Password</h1> <p>Your OTP is <h3>${otp}</h3></p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('OTP Sent Successfully');
      }
    });

    res.status(200).send('OTP Sent Successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.verifyResetToken = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send('User Not Found');
    }

    const isCorrect = jwt.verify(user.otp, JWT_SECRET);

    if (isCorrect.otp != otp) {
      return res.status(400).send('Incorrect OTP');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword.toString(), salt);

    await User.findOneAndUpdate(
      { email: email },
      { $set: { password: hash, otp: null } }
    );

    res.status(200).send('Password Changes Successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};
