/**
 * Server configuration module
 * Sets up Express server with middleware and configuration
 */
const express = require('express');
const cors = require('cors');
require('dotenv').config();

/**
 * Configures and returns an Express application with middleware
 * @returns {Object} Configured Express application
 */
const configureServer = () => {
  const app = express();
  
  // Configure middleware
  app.use(cors());
  app.use(express.json());
  
  return app;
};

/**
 * Server port configuration
 * @returns {Number} Port number from environment or default
 */
const getPort = () => {
  return process.env.PORT || 3000;
};

module.exports = {
  configureServer,
  getPort
};