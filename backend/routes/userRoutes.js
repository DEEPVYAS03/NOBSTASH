const express = require('express');
const { updateUserData } = require('../controllers/userController');
const auth = require('../middleware/authenticate');

const router = express.Router();

router.put('/update-detail', auth, updateUserData);

module.exports = router;
