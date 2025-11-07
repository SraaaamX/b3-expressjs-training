const inquiriesService = require('../services/inquiriesServices');

// Get all inquiries
exports.getAllInquiries = async (req, res) => {
    try {
        const inquiries = await inquiriesService.getAllInquiries();
        res.status(200).json(inquiries);
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message });
    }
};

// Get an inquiry by ID
exports.getInquiryById = async (req, res) => {
    try {
        const inquiry = await inquiriesService.getInquiryById(req.params.id);
        res.status(200).json({
            message: 'Inquiry retrieved successfully',
            data: inquiry
        });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message });
    }
};

// Create a new inquiry
exports.createInquiry = async (req, res) => {
    try {
        const newInquiry = await inquiriesService.createInquiry(req.body);
        res.status(201).json(newInquiry);
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message });
    }
};

// Update an inquiry
exports.updateInquiry = async (req, res) => {
    try {
        const updatedInquiry = await inquiriesService.updateInquiry(
            req.params.id, 
            req.body
        );
        res.status(200).json({
            message: 'Inquiry updated successfully',
            data: updatedInquiry
        });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message });
    }
};

// Delete an inquiry
exports.deleteInquiry = async (req, res) => {
    try {
        const result = await inquiriesService.deleteInquiry(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message });
    }
};

// Get inquiries by user
exports.getInquiriesByUser = async (req, res) => {
    try {
        const inquiries = await inquiriesService.getInquiriesByUser(req.params.userId);
        res.status(200).json(inquiries);
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message });
    }
};

// Get inquiries by property
exports.getInquiriesByProperty = async (req, res) => {
    try {
        const inquiries = await inquiriesService.getInquiriesByProperty(req.params.propertyId);
        res.status(200).json(inquiries);
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message });
    }
};

// Update inquiry status
exports.updateInquiryStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const inquiry = await inquiriesService.updateInquiryStatus(
            req.params.id, 
            status
        );
        res.status(200).json(inquiry);
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message });
    }
};

// Add agent response to an inquiry
exports.addAgentResponse = async (req, res) => {
    try {
        const { response } = req.body;
        const inquiry = await inquiriesService.addAgentResponse(
            req.params.id, 
            response
        );
        res.status(200).json(inquiry);
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message });
    }
};