/**
 * Routes configuration module
 * Centralizes all API routes registration
 */
const userRoutes = require('../../routes/usersRoutes');
const authRoutes = require('../../routes/authRoutes');
const propertiesRoutes = require('../../routes/propertiesRoutes');
const inquiriesRoutes = require('../../routes/inquiriesRoutes');

/**
 * Registers all application routes with the Express app
 * @param {Object} app - Express application instance
 */
const registerRoutes = (app) => {
  // Register API routes
  app.use('/api/users', userRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/properties', propertiesRoutes);
  app.use('/api/inquiries', inquiriesRoutes);
  
  // Add a simple health check route
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
  });
};

module.exports = registerRoutes;