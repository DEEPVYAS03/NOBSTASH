const jwt = require('jsonwebtoken');
const User = require('../models/User');

const dotenv = require('dotenv');
dotenv.config();
dotenv.config({ path: '.env.local' });

exports.updateUserData = async (req, res) => {
  try {
    const id = req.body.userID;
    const { userName, name, email, phone, address, pincode } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      {
        userName,
        name,
        email,
        phone,
        address,
        pincode,
      },
      { new: true }
    ).select('-password -__v -createdAt -updatedAt -isVerified -otp');

    return res.status(200).send({ message: 'User updated successfully', user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal server error' });
  }
};
