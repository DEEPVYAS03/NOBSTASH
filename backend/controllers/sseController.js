const jwt = require('jsonwebtoken');
require('dotenv').config();

let clients = new Map();

exports.eventsHandler = (req, res) => {
  const token = req.query.token;
  if (!token) {
    res.status(401).send('Authorization token is required');
    return;
  }
  let userId;

  try {
    
    const decoded = jwt.verify(token, "shiva$rama$krishna");
    userId = decoded.id;
  } catch (error) {
    console.error(error);
    res.status(401).send({ err: 'Invalid token', error });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  clients.set(userId, res);

  req.on('close', () => {
    clients.delete(userId);
  });
}

exports.sendEvent = (userId, data) => {
  const client = clients.get(userId);
  if (client) {
    client.write(`data: ${JSON.stringify(data)}\n\n`);
  } else {
    console.error(`Client with ID ${userId} not found`);
  }
}