// Auth controller: handles login/logout/refresh and issues JWT cookies for admins.
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const createAudit = require('../utils/createAudit');

const cookieName = process.env.COOKIE_NAME || 'sz_session';

const buildToken = (admin) =>
  jwt.sign(
    { id: admin._id, email: admin.email, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin || !admin.isActive) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const passwordMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = buildToken(admin);
    await Admin.findByIdAndUpdate(admin._id, { lastLogin: new Date() });
    await createAudit({
      action: 'admin.login',
      actor: admin.email,
      actorId: admin._id,
      metadata: { ip: req.ip },
    });
    res.cookie(cookieName, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60, // aligns with default expiry
      domain: process.env.COOKIE_DOMAIN || undefined,
    });
    res.json({ message: 'Logged in' });
  } catch (error) {
    next(error);
  }
};

exports.refresh = async (req, res) => {
  res.json({ message: 'Refresh endpoint stub – wire up token rotation later.' });
};

exports.logout = async (req, res) => {
  res.clearCookie(cookieName, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    domain: process.env.COOKIE_DOMAIN || undefined,
  });
  res.json({ message: 'Logged out' });
};
