const express = require('express');
const router = express.Router();
const inquiriesController = require('../controllers/inquiriesControllers');
const verifyToken = require('../middlewares/verifyToken');
const verifyAgent = require('../middlewares/verifyAgent');
const verifyAdmin = require('../middlewares/verifyAdmin');

// Routes with user authentication
router.post('/', verifyToken, inquiriesController.createInquiry);
router.get('/user/:userId', verifyToken, inquiriesController.getInquiriesByUser);

// Routes with agent/admin authentication
router.get('/', verifyAgent, inquiriesController.getAllInquiries);
router.get('/:id', verifyAgent, inquiriesController.getInquiryById);
router.get('/property/:propertyId', verifyAgent, inquiriesController.getInquiriesByProperty);
router.put('/:id', verifyAgent, inquiriesController.updateInquiry);
router.delete('/:id', verifyAgent, inquiriesController.deleteInquiry);
router.patch('/:id/status', verifyAgent, inquiriesController.updateInquiryStatus);
router.patch('/:id/response', verifyAgent, inquiriesController.addAgentResponse);

module.exports = router;