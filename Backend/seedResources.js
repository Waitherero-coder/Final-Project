// backend/seedResources.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Resource from './models/Resources.js'; // note the .js extension

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || '';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const resources = [
  {
    title: 'PCOS Diet Tips',
    description: 'Healthy eating tips for PCOS',
    category: 'Nutrition',
    content: 'Eat more whole foods, reduce sugar and processed foods, and focus on high-fiber meals.',
    url: ''
  },
  {
    title: 'Exercise for PCOS',
    description: 'Recommended exercises for women with PCOS',
    category: 'Fitness',
    content: 'Incorporate strength training 2-3 times a week and moderate cardio exercises like walking or cycling.',
    url: ''
  },
  {
    title: 'Managing Stress',
    description: 'Tips to manage stress for better hormonal balance',
    category: 'Wellness',
    content: 'Practice mindfulness, meditation, or yoga daily to reduce cortisol levels.',
    url: ''
  },
  // Add more resources here if needed
];

async function seed() {
  try {
    await Resource.insertMany(resources);
    console.log('Resources seeded successfully');
  } catch (err) {
    console.error('Error seeding resources:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seed();
