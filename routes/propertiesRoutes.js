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

/**
 * @swagger
 * tags:
 *   name: Properties
 *   description: Property management operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Property:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - price
 *         - location
 *         - bedrooms
 *         - bathrooms
 *         - area
 *         - type
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated property ID
 *         title:
 *           type: string
 *           description: Property title
 *         description:
 *           type: string
 *           description: Detailed property description
 *         price:
 *           type: number
 *           description: Property price
 *         location:
 *           type: object
 *           properties:
 *             address:
 *               type: string
 *             city:
 *               type: string
 *             state:
 *               type: string
 *             zipCode:
 *               type: string
 *             country:
 *               type: string
 *         bedrooms:
 *           type: integer
 *           description: Number of bedrooms
 *         bathrooms:
 *           type: integer
 *           description: Number of bathrooms
 *         area:
 *           type: number
 *           description: Property area in square feet/meters
 *         type:
 *           type: string
 *           enum: [house, apartment, condo, land, commercial]
 *           description: Property type
 *         status:
 *           type: string
 *           enum: [available, pending, sold]
 *           description: Property status
 *         featured:
 *           type: boolean
 *           description: Whether the property is featured
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs
 *         amenities:
 *           type: array
 *           items:
 *             type: string
 *           description: List of property amenities
 *         agent:
 *           type: string
 *           description: ID of the agent who listed the property
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Property listing creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Property listing last update timestamp
 */

/**
 * @swagger
 * /api/properties:
 *   get:
 *     summary: Get all properties
 *     tags: [Properties]
 *     description: Retrieve a list of all properties
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of properties to return
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort field (e.g., price, createdAt)
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order
 *     responses:
 *       200:
 *         description: A list of properties
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Property'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     pages:
 *                       type: integer
 *       500:
 *         description: Server error
 */
router.get('/', propertiesController.getAllProperties);

/**
 * @swagger
 * /api/properties/search:
 *   get:
 *     summary: Search properties
 *     tags: [Properties]
 *     description: Search for properties based on various criteria
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Keyword to search in title and description
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price
 *       - in: query
 *         name: bedrooms
 *         schema:
 *           type: integer
 *         description: Minimum number of bedrooms
 *       - in: query
 *         name: bathrooms
 *         schema:
 *           type: integer
 *         description: Minimum number of bathrooms
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Property type
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: City location
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Property status
 *       - in: query
 *         name: featured
 *         schema:
 *           type: boolean
 *         description: Featured properties only
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Property'
 *                 count:
 *                   type: integer
 *                   description: Number of results
 *       500:
 *         description: Server error
 */
router.get('/search', propertiesController.searchProperties);

/**
 * @swagger
 * /api/properties/{id}:
 *   get:
 *     summary: Get property by ID
 *     tags: [Properties]
 *     description: Retrieve a specific property by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Property ID
 *     responses:
 *       200:
 *         description: Property details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Property'
 *       404:
 *         description: Property not found
 *       500:
 *         description: Server error
 */
router.get('/:id', propertiesController.getPropertyById);

/**
 * @swagger
 * /api/properties:
 *   post:
 *     summary: Create a new property
 *     tags: [Properties]
 *     description: Create a new property listing. Only accessible to agents and administrators.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - price
 *               - location
 *               - bedrooms
 *               - bathrooms
 *               - area
 *               - type
 *             properties:
 *               title:
 *                 type: string
 *                 description: Property title
 *               description:
 *                 type: string
 *                 description: Detailed property description
 *               price:
 *                 type: number
 *                 description: Property price
 *               location:
 *                 type: object
 *                 properties:
 *                   address:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   zipCode:
 *                     type: string
 *                   country:
 *                     type: string
 *               bedrooms:
 *                 type: integer
 *                 description: Number of bedrooms
 *               bathrooms:
 *                 type: integer
 *                 description: Number of bathrooms
 *               area:
 *                 type: number
 *                 description: Property area in square feet/meters
 *               type:
 *                 type: string
 *                 enum: [house, apartment, condo, land, commercial]
 *                 description: Property type
 *               status:
 *                 type: string
 *                 enum: [available, pending, sold]
 *                 description: Property status
 *               amenities:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of property amenities
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Property images
 *     responses:
 *       201:
 *         description: Property created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Property created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Property'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Not an agent or administrator
 *       500:
 *         description: Server error
 */
router.post('/', verifyAgent, validate(createPropertySchema), uploadPropertyImage, propertiesController.createProperty);

/**
 * @swagger
 * /api/properties/{id}:
 *   put:
 *     summary: Update property
 *     tags: [Properties]
 *     description: Update a property listing. Only accessible to the agent who created the property or administrators.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Property ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Property title
 *               description:
 *                 type: string
 *                 description: Detailed property description
 *               price:
 *                 type: number
 *                 description: Property price
 *               location:
 *                 type: object
 *                 properties:
 *                   address:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   zipCode:
 *                     type: string
 *                   country:
 *                     type: string
 *               bedrooms:
 *                 type: integer
 *                 description: Number of bedrooms
 *               bathrooms:
 *                 type: integer
 *                 description: Number of bathrooms
 *               area:
 *                 type: number
 *                 description: Property area in square feet/meters
 *               type:
 *                 type: string
 *                 enum: [house, apartment, condo, land, commercial]
 *                 description: Property type
 *               amenities:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of property amenities
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Property images
 *     responses:
 *       200:
 *         description: Property updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Property updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Property'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Not authorized to update this property
 *       404:
 *         description: Property not found
 *       500:
 *         description: Server error
 */
router.put('/:id', verifyAgent, validate(updatePropertySchema), uploadPropertyImage, propertiesController.updateProperty);

/**
 * @swagger
 * /api/properties/{id}:
 *   delete:
 *     summary: Delete property
 *     tags: [Properties]
 *     description: Delete a property listing. Only accessible to the agent who created the property or administrators.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Property ID
 *     responses:
 *       200:
 *         description: Property deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Property deleted successfully
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Not authorized to delete this property
 *       404:
 *         description: Property not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', verifyAgent, propertiesController.deleteProperty);

/**
 * @swagger
 * /api/properties/{id}/featured:
 *   patch:
 *     summary: Toggle featured status
 *     tags: [Properties]
 *     description: Toggle whether a property is featured. Only accessible to agents and administrators.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Property ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - featured
 *             properties:
 *               featured:
 *                 type: boolean
 *                 description: Featured status
 *     responses:
 *       200:
 *         description: Featured status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Featured status updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Property'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Not authorized to update this property
 *       404:
 *         description: Property not found
 *       500:
 *         description: Server error
 */
router.patch('/:id/featured', verifyAgent, validate(toggleFeaturedSchema), propertiesController.toggleFeatured);

/**
 * @swagger
 * /api/properties/{id}/status:
 *   patch:
 *     summary: Update property status
 *     tags: [Properties]
 *     description: Update the status of a property. Only accessible to agents and administrators.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Property ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [available, pending, sold]
 *                 description: Property status
 *     responses:
 *       200:
 *         description: Status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Status updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Property'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Not authorized to update this property
 *       404:
 *         description: Property not found
 *       500:
 *         description: Server error
 */
router.patch('/:id/status', verifyAgent, validate(updateStatusSchema), propertiesController.updateStatus);

module.exports = router;