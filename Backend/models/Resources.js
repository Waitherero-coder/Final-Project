const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  content: { type: String },
  url: { type: String },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Resources', resourceSchema);
