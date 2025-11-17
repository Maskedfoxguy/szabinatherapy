// Auth middleware: verifies the JWT stored in the signed cookie and populates req.user.
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies?.[process.env.COOKIE_NAME || 'sz_session'];
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired session' });
  }
};
