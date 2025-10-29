/**
 * Mappers pour les demandes de renseignements
 */

const { InquiryDto, CreateInquiryDto, UpdateInquiryDto } = require('../dtos/inquiriesDtos');

/**
 * Convertit un objet demande en DTO pour la réponse API
 * @param {Object} inquiry - L'objet demande à convertir
 * @returns {InquiryDto} Le DTO de la demande
 */
const toInquiryDto = (inquiry) => {
    if (!inquiry) return null;
    
    return new InquiryDto(
        inquiry._id,
        inquiry.property_id,
        inquiry.user_id,
        inquiry.message,
        inquiry.status,
        inquiry.createdAt,
        inquiry.updatedAt
    );
};

/**
 * Convertit une liste de demandes en liste de DTOs
 * @param {Array} inquiries - La liste de demandes à convertir
 * @returns {Array<InquiryDto>} La liste des DTOs demandes
 */
const toInquiryDtoList = (inquiries) => {
    if (!inquiries || !Array.isArray(inquiries)) return [];
    
    return inquiries.map(inquiry => toInquiryDto(inquiry));
};

/**
 * Prépare un objet pour la création d'une demande
 * @param {CreateInquiryDto} createInquiryDto - Les données de la demande à créer
 * @returns {Object} L'objet préparé pour la création
 */
const fromCreateInquiryDto = (createInquiryDto) => {
    return {
        property_id: createInquiryDto.property_id,
        user_id: createInquiryDto.user_id,
        message: createInquiryDto.message,
        status: createInquiryDto.status || 'pending'
    };
};

/**
 * Prépare un objet pour la mise à jour d'une demande
 * @param {UpdateInquiryDto} updateInquiryDto - Les données de la demande à mettre à jour
 * @returns {Object} L'objet préparé pour la mise à jour
 */
const fromUpdateInquiryDto = (updateInquiryDto) => {
    const updateData = {};
    
    if (updateInquiryDto.property_id !== undefined) updateData.property_id = updateInquiryDto.property_id;
    if (updateInquiryDto.user_id !== undefined) updateData.user_id = updateInquiryDto.user_id;
    if (updateInquiryDto.message !== undefined) updateData.message = updateInquiryDto.message;
    if (updateInquiryDto.status !== undefined) updateData.status = updateInquiryDto.status;
    
    return updateData;
};

module.exports = {
    toInquiryDto,
    toInquiryDtoList,
    fromCreateInquiryDto,
    fromUpdateInquiryDto
};