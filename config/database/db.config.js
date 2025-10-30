/**
 * Database configuration module
 * Handles MongoDB connection setup and events
 */
const mongoose = require('mongoose');
require('dotenv').config();

/**
 * Establishes connection to MongoDB using environment variables
 * @returns {Promise} Mongoose connection promise
 */
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB database');
    return connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;