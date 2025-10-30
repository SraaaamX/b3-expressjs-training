/**
 * Mappers for inquiries
 */

// No need to import DTOs as we define our own mapping functions
// that directly return objects in the expected format

/**
 * Converts an inquiry object into an API response DTO
 */
const toInquiryDto = (inquiry) => {
    if (!inquiry) return null;
    
    return {
        id: inquiry._id,
        property_id: inquiry.property_id,
        user_id: inquiry.user_id,
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
 * Converts a list of inquiries into a list of DTOs
 */
const toInquiryDtoList = (inquiries) => {
    if (!inquiries || !Array.isArray(inquiries)) return [];
    
    return inquiries.map(inquiry => toInquiryDto(inquiry));
};

/**
 * Prepares an object for creating an inquiry
 */
const fromCreateInquiryDto = (createInquiryDto) => {
    return {
        property_id: createInquiryDto.property_id,
        user_id: createInquiryDto.user_id,
        inquiry_type: createInquiryDto.inquiry_type,
        message: createInquiryDto.message,
        preferred_date: createInquiryDto.preferred_date,
        preferred_time: createInquiryDto.preferred_time,
        status: createInquiryDto.status || 'pending'
    };
};

/**
 * Prepares an object for updating an inquiry
 */
const fromUpdateInquiryDto = (updateInquiryDto) => {
    const updateData = {};
    
    if (updateInquiryDto.property_id !== undefined) updateData.property_id = updateInquiryDto.property_id;
    if (updateInquiryDto.user_id !== undefined) updateData.user_id = updateInquiryDto.user_id;
    if (updateInquiryDto.inquiry_type !== undefined) updateData.inquiry_type = updateInquiryDto.inquiry_type;
    if (updateInquiryDto.message !== undefined) updateData.message = updateInquiryDto.message;
    if (updateInquiryDto.preferred_date !== undefined) updateData.preferred_date = updateInquiryDto.preferred_date;
    if (updateInquiryDto.preferred_time !== undefined) updateData.preferred_time = updateInquiryDto.preferred_time;
    if (updateInquiryDto.status !== undefined) updateData.status = updateInquiryDto.status;
    if (updateInquiryDto.agent_response !== undefined) updateData.agent_response = updateInquiryDto.agent_response;
    
    return updateData;
};

module.exports = {
    toInquiryDto,
    toInquiryDtoList,
    fromCreateInquiryDto,
    fromUpdateInquiryDto
};