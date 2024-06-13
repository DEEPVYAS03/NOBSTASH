const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET =
  'b6c73deba6febbff82299ab18495894cdbd2ff0b4f24452b86b3b48d32fb7563';

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.body.userID = decoded.id;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Invalid token' });
  }
};
