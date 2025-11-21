const mongoose = require('mongoose');

const healthMetricSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  exerciseMinutes: { type: Number, required: true },
  exerciseType: { type: String, default: null },
  weight: { type: Number, default: null },
  waterIntake: { type: Number, default: null },
}, { timestamps: true });

module.exports = mongoose.model('HealthMetric', healthMetricSchema);
