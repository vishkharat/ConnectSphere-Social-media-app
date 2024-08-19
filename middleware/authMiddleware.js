// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/jwtConfig');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = await User.findById(decoded.id);
    if (!req.user) return res.status(401).json({ error: 'Invalid token' });

    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
