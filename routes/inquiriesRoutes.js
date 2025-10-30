const express = require('express');
const router = express.Router();
const inquiriesController = require('../controllers/inquiriesControllers');
const verifyToken = require('../middlewares/verifyToken');
const verifyAgent = require('../middlewares/verifyAgent');
const verifyAdmin = require('../middlewares/verifyAdmin');
const validate = require('../middlewares/validationMiddleware');
const { createInquirySchema, updateInquirySchema, responseSchema } = require('../schemas/inquirySchemas');

/**
 * @swagger
 * tags:
 *   name: Inquiries
 *   description: Property inquiry management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Inquiry:
 *       type: object
 *       required:
 *         - property
 *         - user
 *         - message
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated inquiry ID
 *         property:
 *           type: string
 *           description: ID of the property being inquired about
 *         user:
 *           type: string
 *           description: ID of the user making the inquiry
 *         message:
 *           type: string
 *           description: Inquiry message from the user
 *         status:
 *           type: string
 *           enum: [pending, in_progress, resolved, closed]
 *           description: Current status of the inquiry
 *         agentResponse:
 *           type: string
 *           description: Response from the agent
 *         responseDate:
 *           type: string
 *           format: date-time
 *           description: Date when the agent responded
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Inquiry creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Inquiry last update timestamp
 */

/**
 * @swagger
 * /api/inquiries:
 *   post:
 *     summary: Create a new inquiry
 *     tags: [Inquiries]
 *     description: Create a new property inquiry. Requires user authentication.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - property
 *               - message
 *             properties:
 *               property:
 *                 type: string
 *                 description: ID of the property being inquired about
 *               message:
 *                 type: string
 *                 description: Inquiry message
 *     responses:
 *       201:
 *         description: Inquiry created successfully
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
 *                   example: Inquiry created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Inquiry'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Server error
 */
router.post('/', verifyToken, validate(createInquirySchema), inquiriesController.createInquiry);

/**
 * @swagger
 * /api/inquiries/user/{userId}:
 *   get:
 *     summary: Get inquiries by user
 *     tags: [Inquiries]
 *     description: Retrieve all inquiries made by a specific user. Requires user authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of inquiries for the user
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
 *                     $ref: '#/components/schemas/Inquiry'
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Not authorized to view these inquiries
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/user/:userId', verifyToken, inquiriesController.getInquiriesByUser);

/**
 * @swagger
 * /api/inquiries:
 *   get:
 *     summary: Get all inquiries
 *     tags: [Inquiries]
 *     description: Retrieve all property inquiries. Only accessible to agents and administrators.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, in_progress, resolved, closed]
 *         description: Filter inquiries by status
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of inquiries to return
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: List of all inquiries
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
 *                     $ref: '#/components/schemas/Inquiry'
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
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Not an agent or administrator
 *       500:
 *         description: Server error
 */
router.get('/', verifyAgent, inquiriesController.getAllInquiries);

/**
 * @swagger
 * /api/inquiries/{id}:
 *   get:
 *     summary: Get inquiry by ID
 *     tags: [Inquiries]
 *     description: Retrieve a specific inquiry by its ID. Only accessible to agents and administrators.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Inquiry ID
 *     responses:
 *       200:
 *         description: Inquiry details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Inquiry'
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Not an agent or administrator
 *       404:
 *         description: Inquiry not found
 *       500:
 *         description: Server error
 */
router.get('/:id', verifyAgent, inquiriesController.getInquiryById);

/**
 * @swagger
 * /api/inquiries/property/{propertyId}:
 *   get:
 *     summary: Get inquiries by property
 *     tags: [Inquiries]
 *     description: Retrieve all inquiries for a specific property. Only accessible to agents and administrators.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         schema:
 *           type: string
 *         description: Property ID
 *     responses:
 *       200:
 *         description: List of inquiries for the property
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
 *                     $ref: '#/components/schemas/Inquiry'
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Not an agent or administrator
 *       404:
 *         description: Property not found
 *       500:
 *         description: Server error
 */
router.get('/property/:propertyId', verifyAgent, inquiriesController.getInquiriesByProperty);

/**
 * @swagger
 * /api/inquiries/{id}:
 *   put:
 *     summary: Update inquiry
 *     tags: [Inquiries]
 *     description: Update an inquiry. Only accessible to agents and administrators.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Inquiry ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, resolved, closed]
 *                 description: Inquiry status
 *               agentResponse:
 *                 type: string
 *                 description: Agent's response to the inquiry
 *     responses:
 *       200:
 *         description: Inquiry updated successfully
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
 *                   example: Inquiry updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Inquiry'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Not an agent or administrator
 *       404:
 *         description: Inquiry not found
 *       500:
 *         description: Server error
 */
router.put('/:id', verifyAgent, validate(updateInquirySchema), inquiriesController.updateInquiry);

/**
 * @swagger
 * /api/inquiries/{id}:
 *   delete:
 *     summary: Delete inquiry
 *     tags: [Inquiries]
 *     description: Delete an inquiry. Only accessible to agents and administrators.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Inquiry ID
 *     responses:
 *       200:
 *         description: Inquiry deleted successfully
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
 *                   example: Inquiry deleted successfully
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Not an agent or administrator
 *       404:
 *         description: Inquiry not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', verifyAgent, inquiriesController.deleteInquiry);

/**
 * @swagger
 * /api/inquiries/{id}/status:
 *   patch:
 *     summary: Update inquiry status
 *     tags: [Inquiries]
 *     description: Update the status of an inquiry. Only accessible to agents and administrators.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Inquiry ID
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
 *                 enum: [pending, in_progress, resolved, closed]
 *                 description: New inquiry status
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
 *                   $ref: '#/components/schemas/Inquiry'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Not an agent or administrator
 *       404:
 *         description: Inquiry not found
 *       500:
 *         description: Server error
 */
router.patch('/:id/status', verifyAgent, validate(updateInquirySchema), inquiriesController.updateInquiryStatus);

/**
 * @swagger
 * /api/inquiries/{id}/response:
 *   patch:
 *     summary: Add agent response
 *     tags: [Inquiries]
 *     description: Add or update an agent's response to an inquiry. Only accessible to agents and administrators.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Inquiry ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - response
 *             properties:
 *               response:
 *                 type: string
 *                 description: Agent's response to the inquiry
 *     responses:
 *       200:
 *         description: Response added successfully
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
 *                   example: Response added successfully
 *                 data:
 *                   $ref: '#/components/schemas/Inquiry'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Not an agent or administrator
 *       404:
 *         description: Inquiry not found
 *       500:
 *         description: Server error
 */
router.patch('/:id/response', verifyAgent, validate(responseSchema), inquiriesController.addAgentResponse);

module.exports = router;