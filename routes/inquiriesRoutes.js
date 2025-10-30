const express = require('express');
const router = express.Router();
const inquiriesController = require('../controllers/inquiriesControllers');
const verifyToken = require('../middlewares/verifyToken');
const verifyAgent = require('../middlewares/verifyAgent');
const verifyAdmin = require('../middlewares/verifyAdmin');
const validate = require('../middlewares/validationMiddleware');
const { createInquirySchema, updateInquirySchema, responseSchema } = require('../schemas/inquirySchemas');

// Routes with user authentication
router.post('/', verifyToken, validate(createInquirySchema), inquiriesController.createInquiry);
router.get('/user/:userId', verifyToken, inquiriesController.getInquiriesByUser);

// Routes with agent/admin authentication
router.get('/', verifyAgent, inquiriesController.getAllInquiries);
router.get('/:id', verifyAgent, inquiriesController.getInquiryById);
router.get('/property/:propertyId', verifyAgent, inquiriesController.getInquiriesByProperty);
router.put('/:id', verifyAgent, validate(updateInquirySchema), inquiriesController.updateInquiry);
router.delete('/:id', verifyAgent, inquiriesController.deleteInquiry);
router.patch('/:id/status', verifyAgent, validate(updateInquirySchema), inquiriesController.updateInquiryStatus);
router.patch('/:id/response', verifyAgent, validate(responseSchema), inquiriesController.addAgentResponse);

module.exports = router;