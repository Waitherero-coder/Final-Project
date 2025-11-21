const Resource = require('../models/Resources');

exports.getResources = async (req, res) => {
  try {
    const category = req.query.category;
    const filter = category && category !== 'all' ? { category } : {};
    const resources = await Resource.find(filter).sort({ created_at: -1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
