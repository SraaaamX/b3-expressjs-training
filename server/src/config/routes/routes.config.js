/**
 * Routes configuration module
 * Centralizes all API routes registration
 */
const userRoutes = require('../../routes/usersRoutes');
const authRoutes = require('../../routes/authRoutes');
const propertiesRoutes = require('../../routes/propertiesRoutes');
const inquiriesRoutes = require('../../routes/inquiriesRoutes');

const registerRoutes = (app) => {
  // Register API routes
  app.use('/api/users', userRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/properties', propertiesRoutes);
  app.use('/api/inquiries', inquiriesRoutes);
};

module.exports = registerRoutes;