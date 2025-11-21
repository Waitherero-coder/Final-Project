const SymptomLog = require('../models/SymptomLog');

exports.addSymptomLog = async (req, res) => {
  try {
    const { userId, date, mood, symptoms, energy_level, sleep_hours, notes } = req.body;

    if (!userId || !date || !mood || energy_level === undefined || sleep_hours === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newLog = new SymptomLog({ userId, date, mood, symptoms, energy_level, sleep_hours, notes });
    await newLog.save();

    res.status(201).json({ message: 'Symptom log added', log: newLog });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getSymptomLogs = async (req, res) => {
  try {
    const { userId } = req.params;
    const logs = await SymptomLog.find({ userId }).sort({ date: -1 }).limit(50);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
