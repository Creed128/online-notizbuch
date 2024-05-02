// testMongoDB.js
require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected successfully');
    mongoose.disconnect();
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

testConnection();
