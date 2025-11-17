// Page model: holds editable marketing pages for the public site.
const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
  heading: String,
  body: String,
  mediaRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Media' },
});

const PageSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  sections: [SectionSchema],
  published: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Page', PageSchema);
