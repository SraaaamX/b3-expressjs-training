const Inquiries = require('../models/inquiriesModel');

class InquiriesService {
    /**
     * Récupère toutes les demandes
     */
    async getAllInquiries() {
        const inquiries = await Inquiries.find();
        if (!inquiries.length) {
            throw { status: 404, message: 'No inquiries found' };
        }
        return inquiries;
    }

    async getInquiryById(inquiryId) {
        const inquiry = await Inquiries.findById(inquiryId);
        if (!inquiry) {
            throw { status: 404, message: 'Inquiry not found' };
        }
        return inquiry;
    }

    async createInquiry(inquiryData) {
        const { user_id, property_id, inquiry_type } = inquiryData;

        // Validation des champs obligatoires
        if (!user_id || !property_id || !inquiry_type) {
            throw { status: 400, message: 'Required fields are missing' };
        }

        const newInquiry = await Inquiries.create(inquiryData);
        return newInquiry;
    }

    async updateInquiry(inquiryId, updates) {
        const updatedInquiry = await Inquiries.findByIdAndUpdate(
            inquiryId,
            updates,
            { new: true, runValidators: true }
        );

        if (!updatedInquiry) {
            throw { status: 404, message: 'Inquiry not found' };
        }

        return updatedInquiry;
    }

    async deleteInquiry(inquiryId) {
        const deletedInquiry = await Inquiries.findByIdAndDelete(inquiryId);

        if (!deletedInquiry) {
            throw { status: 404, message: 'Inquiry not found' };
        }

        return { message: 'Inquiry deleted successfully' };
    }

    async getInquiriesByUser(userId) {
        const inquiries = await Inquiries.find({ user_id: userId });

        if (!inquiries.length) {
            throw { status: 404, message: 'No inquiries found for this user' };
        }

        return inquiries;
    }

    async getInquiriesByProperty(propertyId) {
        const inquiries = await Inquiries.find({ property_id: propertyId });

        if (!inquiries.length) {
            throw { status: 404, message: 'No inquiries found for this property' };
        }

        return inquiries;
    }

    async updateInquiryStatus(inquiryId, status) {
        const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];

        if (!status || !validStatuses.includes(status)) {
            throw { status: 400, message: 'Valid status is required' };
        }

        const inquiry = await Inquiries.findByIdAndUpdate(
            inquiryId,
            { status },
            { new: true }
        );

        if (!inquiry) {
            throw { status: 404, message: 'Inquiry not found' };
        }

        return inquiry;
    }

    async addAgentResponse(inquiryId, agentResponse) {
        if (!agentResponse) {
            throw { status: 400, message: 'Agent response is required' };
        }

        const inquiry = await Inquiries.findByIdAndUpdate(
            inquiryId,
            { agent_response: agentResponse },
            { new: true }
        );

        if (!inquiry) {
            throw { status: 404, message: 'Inquiry not found' };
        }

        return inquiry;
    }
}

module.exports = new InquiriesService();


