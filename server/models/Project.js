// Project model: represents portfolio projects that demonstrate past work.
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  url: String,
  technologies: [String],
  order: { type: Number, default: 0 },
  featuredMedia: { type: mongoose.Schema.Types.ObjectId, ref: 'Media' },
});

module.exports = mongoose.model('Project', ProjectSchema);
