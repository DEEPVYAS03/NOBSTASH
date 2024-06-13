const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "N/A",
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      min: 10000000,
      default: 9876543210,
      required: true,
    },
    address: {
      type: String,
      default: "N/A",
      required: true,
    },
    pincode: {
      type: String,
      default: "N/A",
      required: true,
    },

    amount: {
      type: Number,
      default: 6000,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    otp: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
