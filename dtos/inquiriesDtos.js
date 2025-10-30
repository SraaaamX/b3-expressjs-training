/**
 * DTOs for inquiries
 */

/**
 * Transforms an inquiry object into a response DTO
 */
const toInquiryDto = (inquiry) => {
    if (!inquiry) return null;
    
    return {
        id: inquiry._id,
        user_id: inquiry.user_id,
        property_id: inquiry.property_id,
        inquiry_type: inquiry.inquiry_type,
        message: inquiry.message,
        preferred_date: inquiry.preferred_date,
        preferred_time: inquiry.preferred_time,
        status: inquiry.status,
        agent_response: inquiry.agent_response,
        createdAt: inquiry.createdAt,
        updatedAt: inquiry.updatedAt
    };
};

/**
 * Transforms an array of inquiries into an array of DTOs
 */
const toInquiryDtoList = (inquiries) => {
    if (!inquiries || !Array.isArray(inquiries)) return [];
    
    return inquiries.map(inquiry => toInquiryDto(inquiry));
};

/**
 * Prepares an object for inquiry creation
 */
const fromCreateInquiryDto = (inquiryData) => {
    return {
        user_id: inquiryData.user_id,
        property_id: inquiryData.property_id,
        inquiry_type: inquiryData.inquiry_type,
        message: inquiryData.message,
        preferred_date: inquiryData.preferred_date,
        preferred_time: inquiryData.preferred_time,
        status: inquiryData.status || 'pending',
        agent_response: inquiryData.agent_response
    };
};

/**
 * Prepares an object for inquiry update
 */
const fromUpdateInquiryDto = (inquiryData) => {
    const updateData = {};
    
    if (inquiryData.inquiry_type !== undefined) updateData.inquiry_type = inquiryData.inquiry_type;
    if (inquiryData.message !== undefined) updateData.message = inquiryData.message;
    if (inquiryData.preferred_date !== undefined) updateData.preferred_date = inquiryData.preferred_date;
    if (inquiryData.preferred_time !== undefined) updateData.preferred_time = inquiryData.preferred_time;
    if (inquiryData.status !== undefined) updateData.status = inquiryData.status;
    if (inquiryData.agent_response !== undefined) updateData.agent_response = inquiryData.agent_response;
    
    return updateData;
};

module.exports = {
    toInquiryDto,
    toInquiryDtoList,
    fromCreateInquiryDto,
    fromUpdateInquiryDto
};