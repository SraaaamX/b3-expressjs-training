const Inquiries = require('../models/inquiriesModel');

// Get all inquiries
exports.getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiries.find();
        if (!inquiries.length) {
            return res.status(404).json({ error: 'No inquiries found' });
        }
        res.status(200).json(inquiries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get an inquiry by ID
exports.getInquiryById = async (req, res) => {
    try {
        const inquiry = await Inquiries.findById(req.params.id);
        if (!inquiry) {
            return res.status(404).json({ error: 'Inquiry not found' });
        }
        res.status(200).json({
            message: 'Inquiry retrieved successfully',
            data: inquiry
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new inquiry
exports.createInquiry = async (req, res) => {
    try {
        const { user_id, property_id, inquiry_type } = req.body;
        
        // Verification of required fields
        if (!user_id || !property_id || !inquiry_type) {
            return res.status(400).json({ error: 'Required fields are missing' });
        }
        
        const newInquiry = await Inquiries.create(req.body);
        res.status(201).json(newInquiry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an inquiry
exports.updateInquiry = async (req, res) => {
    try {
        const updatedInquiry = await Inquiries.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!updatedInquiry) {
            return res.status(404).json({ error: 'Inquiry not found' });
        }
        
        res.status(200).json({
            message: 'Inquiry updated successfully',
            data: updatedInquiry
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an inquiry
exports.deleteInquiry = async (req, res) => {
    try {
        const deletedInquiry = await Inquiries.findByIdAndDelete(req.params.id);
        
        if (!deletedInquiry) {
            return res.status(404).json({ error: 'Inquiry not found' });
        }
        
        res.status(200).json({ message: 'Inquiry deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get inquiries by user
exports.getInquiriesByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const inquiries = await Inquiries.find({ user_id: userId });
        
        if (!inquiries.length) {
            return res.status(404).json({ error: 'No inquiries found for this user' });
        }
        
        res.status(200).json(inquiries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get inquiries by property
exports.getInquiriesByProperty = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const inquiries = await Inquiries.find({ property_id: propertyId });
        
        if (!inquiries.length) {
            return res.status(404).json({ error: 'No inquiries found for this property' });
        }
        
        res.status(200).json(inquiries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update inquiry status
exports.updateInquiryStatus = async (req, res) => {
    try {
        const { status } = req.body;
        
        if (!status || !['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
            return res.status(400).json({ error: 'Valid status is required' });
        }
        
        const inquiry = await Inquiries.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        
        if (!inquiry) {
            return res.status(404).json({ error: 'Inquiry not found' });
        }
        
        res.status(200).json(inquiry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add agent response to an inquiry
exports.addAgentResponse = async (req, res) => {
    try {
        const { agent_response } = req.body;
        
        if (!agent_response) {
            return res.status(400).json({ error: 'Agent response is required' });
        }
        
        const inquiry = await Inquiries.findByIdAndUpdate(
            req.params.id,
            { agent_response },
            { new: true }
        );
        
        if (!inquiry) {
            return res.status(404).json({ error: 'Inquiry not found' });
        }
        
        res.status(200).json(inquiry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};