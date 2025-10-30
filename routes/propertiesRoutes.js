const express = require('express');
const router = express.Router();
const propertiesController = require('../controllers/propertiesControllers');
const verifyToken = require('../middlewares/verifyToken');
const verifyAgent = require('../middlewares/verifyAgent');
const verifyAdmin = require('../middlewares/verifyAdmin');
const { uploadPropertyImage } = require('../middlewares/uploadMiddleware');
const validate = require('../middlewares/validationMiddleware');
const { 
  createPropertySchema, 
  updatePropertySchema,
  toggleFeaturedSchema,
  updateStatusSchema
} = require('../schemas/propertySchemas');

// Public routes
router.get('/', propertiesController.getAllProperties);
router.get('/search', propertiesController.searchProperties);
router.get('/:id', propertiesController.getPropertyById);

// Routes with authentication
router.post('/', verifyAgent, validate(createPropertySchema), uploadPropertyImage, propertiesController.createProperty);
router.put('/:id', verifyAgent, validate(updatePropertySchema), uploadPropertyImage, propertiesController.updateProperty);
router.delete('/:id', verifyAgent, propertiesController.deleteProperty);

// Specific routes for agents and admins
router.patch('/:id/featured', verifyAgent, validate(toggleFeaturedSchema), propertiesController.toggleFeatured);
router.patch('/:id/status', verifyAgent, validate(updateStatusSchema), propertiesController.updateStatus);

module.exports = router;