const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const hmRoutes = require('./routes/HMroutes');
const resourceRoutes = require('./routes/Resourceroute');
const slRoutes = require('./routes/SLroutes');

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/api/health-metrics', hmRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/symptom-logs', slRoutes);

app.get('/', (_req, res) => res.send('Backend is running'));

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || '';
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
