const mongoose = require('mongoose');

const symptomLogSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  mood: { type: String, enum: ['excellent', 'good', 'fair', 'poor'], required: true },
  symptoms: [{ type: String }],
  energy_level: { type: Number, min: 1, max: 10, required: true },
  sleep_hours: { type: Number, min: 0, max: 24, required: true },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('SymptomLog', symptomLogSchema);
