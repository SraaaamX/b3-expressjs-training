/**
 * Main application entry point
 * Initializes and starts the Express server with all configurations
 */
require('dotenv').config();

// Import configuration modules
const connectDB = require('./src/config/database/db.config');
const { configureServer, getPort } = require('./src/config/server/server.config');
const registerRoutes = require('./src/config/routes/routes.config');
const setupSwagger = require('./src/config/swagger/swagger.config');

// Initialize Express app with configurations
const app = configureServer();
const port = getPort();

// Setup Swagger documentation
setupSwagger(app);

// Register all application routes
registerRoutes(app);

// Connect to database and start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Start Express server
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the application
startServer();