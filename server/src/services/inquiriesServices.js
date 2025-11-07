const Inquiries = require('../models/inquiriesModel');
const { toInquiryDto, toInquiryDtoList, fromCreateInquiryDto, fromUpdateInquiryDto } = require('../mappers/inquiriesMappers');

class InquiriesService {
    /**
     * Retrieves all inquiries from the database
     */
    async getAllInquiries() {
        const inquiries = await Inquiries.find();
        if (!inquiries.length) {
            throw { status: 404, message: 'No inquiries found' };
        }
        return toInquiryDtoList(inquiries);
    }

    /**
     * Retrieves a single inquiry by its unique identifier
     */
    async getInquiryById(inquiryId) {
        const inquiry = await Inquiries.findById(inquiryId);
        if (!inquiry) {
            throw { status: 404, message: 'Inquiry not found' };
        }
        return toInquiryDto(inquiry);
    }

    /**
     * Creates a new inquiry after validating required fields
     */
    async createInquiry(inquiryData) {
        const { user_id, property_id, inquiry_type } = inquiryData;

        // Validation des champs obligatoires
        if (!user_id || !property_id || !inquiry_type) {
            throw { status: 400, message: 'Required fields are missing' };
        }

        const newInquiryData = fromCreateInquiryDto(inquiryData);
        const newInquiry = await Inquiries.create(newInquiryData);
        return toInquiryDto(newInquiry);
    }

    /**
     * Updates an existing inquiry with the provided changes
     */
    async updateInquiry(inquiryId, updates) {
        const updateData = fromUpdateInquiryDto(updates);
        
        const updatedInquiry = await Inquiries.findByIdAndUpdate(
            inquiryId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedInquiry) {
            throw { status: 404, message: 'Inquiry not found' };
        }

        return toInquiryDto(updatedInquiry);
    }

    /**
     * Removes an inquiry from the database
     */
    async deleteInquiry(inquiryId) {
        const deletedInquiry = await Inquiries.findByIdAndDelete(inquiryId);

        if (!deletedInquiry) {
            throw { status: 404, message: 'Inquiry not found' };
        }

        return { message: 'Inquiry deleted successfully' };
    }

    /**
     * Retrieves all inquiries associated with a specific user
     */
    async getInquiriesByUser(userId) {
        const inquiries = await Inquiries.find({ user_id: userId });

        if (!inquiries.length) {
            throw { status: 404, message: 'No inquiries found for this user' };
        }

        return toInquiryDtoList(inquiries);
    }

    /**
     * Retrieves all inquiries related to a particular property
     */
    async getInquiriesByProperty(propertyId) {
        const inquiries = await Inquiries.find({ property_id: propertyId });

        if (!inquiries.length) {
            throw { status: 404, message: 'No inquiries found for this property' };
        }

        return toInquiryDtoList(inquiries);
    }

    /**
     * Updates the status of an inquiry to one of the predefined values
     */
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

        return toInquiryDto(inquiry);
    }

    /**
     * Adds or updates the agent's response for a given inquiry
     */
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

        return toInquiryDto(inquiry);
    }
}

module.exports = new InquiriesService();
