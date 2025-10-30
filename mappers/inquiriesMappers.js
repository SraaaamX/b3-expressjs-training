/**
 * Mappers for inquiries
 * These mappers convert between model objects and DTOs
 */

const { InquiryDto, CreateInquiryDto, UpdateInquiryDto } = require('../dtos/inquiriesDtos');

/**
 * Converts an inquiry object into an API response DTO
 */
const toInquiryDto = (inquiry) => {
    if (!inquiry) return null;
    
    return new InquiryDto(
        inquiry._id,
        inquiry.user_id,
        inquiry.property_id,
        inquiry.inquiry_type,
        inquiry.message,
        inquiry.preferred_date,
        inquiry.preferred_time,
        inquiry.status,
        inquiry.agent_response,
        inquiry.createdAt,
        inquiry.updatedAt
    );
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
        user_id: createInquiryDto.user_id,
        property_id: createInquiryDto.property_id,
        inquiry_type: createInquiryDto.inquiry_type,
        message: createInquiryDto.message,
        preferred_date: createInquiryDto.preferred_date,
        preferred_time: createInquiryDto.preferred_time,
        status: createInquiryDto.status || 'pending',
        agent_response: createInquiryDto.agent_response
    };
};

/**
 * Prepares an object for updating an inquiry
 */
const fromUpdateInquiryDto = (updateInquiryDto) => {
    const updateData = {};
    
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