/**
 * DTOs for inquiries
 * These DTOs are designed to match the inquiry model structure
 */

/**
 * DTO representing an inquiry in API responses
 */
class InquiryDto {
    constructor(id, user_id, property_id, inquiry_type, message, preferred_date, 
                preferred_time, status, agent_response, createdAt, updatedAt) {
        this.id = id;
        this.user_id = user_id;
        this.property_id = property_id;
        this.inquiry_type = inquiry_type;
        this.message = message;
        this.preferred_date = preferred_date;
        this.preferred_time = preferred_time;
        this.status = status;
        this.agent_response = agent_response;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

/**
 * DTO for creating an inquiry
 */
class CreateInquiryDto {
    constructor(user_id, property_id, inquiry_type, message, preferred_date, 
                preferred_time, status = 'pending', agent_response = null) {
        this.user_id = user_id;
        this.property_id = property_id;
        this.inquiry_type = inquiry_type;
        this.message = message;
        this.preferred_date = preferred_date;
        this.preferred_time = preferred_time;
        this.status = status;
        this.agent_response = agent_response;
    }
}

/**
 * DTO for updating an inquiry
 */
class UpdateInquiryDto {
    constructor(data = {}) {
        if (data.inquiry_type !== undefined) this.inquiry_type = data.inquiry_type;
        if (data.message !== undefined) this.message = data.message;
        if (data.preferred_date !== undefined) this.preferred_date = data.preferred_date;
        if (data.preferred_time !== undefined) this.preferred_time = data.preferred_time;
        if (data.status !== undefined) this.status = data.status;
        if (data.agent_response !== undefined) this.agent_response = data.agent_response;
    }
}

module.exports = {
    InquiryDto,
    CreateInquiryDto,
    UpdateInquiryDto
};