const express = require('express');
const router = express.Router();
const propertiesController = require('../controllers/propertiesControllers');
const verifyToken = require('../middlewares/verifyToken');
const verifyAgent = require('../middlewares/verifyAgent');
const verifyAdmin = require('../middlewares/verifyAdmin');

// Public routes
router.get('/', propertiesController.getAllProperties);
router.get('/search', propertiesController.searchProperties);
router.get('/:id', propertiesController.getPropertyById);

// Routes with authentication
router.post('/', verifyAgent, propertiesController.createProperty);
router.put('/:id', verifyAgent, propertiesController.updateProperty);
router.delete('/:id', verifyAgent, propertiesController.deleteProperty);

// Specific routes for agents and admins
router.patch('/:id/featured', verifyAgent, propertiesController.toggleFeatured);
router.patch('/:id/status', verifyAgent, propertiesController.updateStatus);

module.exports = router;