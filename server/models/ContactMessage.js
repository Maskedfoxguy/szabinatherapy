// ContactMessage model: stores messages submitted via the public contact form.
const mongoose = require('mongoose');

const ContactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  source: { type: String, default: 'web' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ContactMessage', ContactMessageSchema);
