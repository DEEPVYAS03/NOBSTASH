const express = require('express');
const {
  signup,
  login,
  verifyUser,
  generateResetToken,
  verifyResetToken,
  loginWithToken,
} = require('../controllers/authController');
const auth = require('../middleware/authenticate');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/verify/:token', verifyUser);
router.post('/forgot-password', generateResetToken);
router.post('/reset-password', verifyResetToken);
router.post('/token', auth, loginWithToken);

module.exports = router;
