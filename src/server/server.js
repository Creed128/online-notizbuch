const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./routes');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// CORS configuration to accept requests from the frontend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // To support session cookies
}));

// Middleware to parse JSON
app.use(express.json());

// API routes
app.use('/api', routes);

// Simple route for base URL
app.get('/', (req, res) => {
  res.send('Server is running.');
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).send('Server error');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.log('MongoDB connection error:', err);
    process.exit(1); // Exit process with error
  });

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
