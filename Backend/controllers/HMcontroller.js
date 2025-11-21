const HealthMetric = require('../models/HealthMetric');

exports.createHealthMetric = async (req, res) => {
  try {
    const metric = new HealthMetric(req.body);
    await metric.save();
    res.status(201).json(metric);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getHealthMetrics = async (req, res) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId } : {};
    const metrics = await HealthMetric.find(filter).sort({ date: -1 });
    res.json(metrics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
