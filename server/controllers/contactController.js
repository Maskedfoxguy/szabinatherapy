// Contact controller: receives public inquiries and stores them for follow-up.
const ContactMessage = require('../models/ContactMessage');
const createAudit = require('../utils/createAudit');

exports.submitMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const doc = await ContactMessage.create({ name, email, message });
    await createAudit({
      action: 'contact.submit',
      actor: email,
      targetModel: 'ContactMessage',
      targetId: doc._id,
    });
    res.status(201).json({ message: 'Message received' });
  } catch (error) {
    next(error);
  }
};
