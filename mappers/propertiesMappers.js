/**
 * Mappers pour les propriétés
 */

const { PropertyDto, CreatePropertyDto, UpdatePropertyDto } = require('../dtos/propertiesDtos');

/**
 * Convertit un objet propriété en DTO pour la réponse API
 * @param {Object} property - L'objet propriété à convertir
 * @returns {PropertyDto} Le DTO de la propriété
 */
const toPropertyDto = (property) => {
    if (!property) return null;
    
    return new PropertyDto(
        property._id,
        property.title,
        property.image,
        property.description,
        property.price,
        property.property_type,
        property.transaction_type,
        property.address,
        property.city,
        property.postal_code,
        property.surface_area,
        property.rooms,
        property.createdAt,
        property.updatedAt
    );
};

/**
 * Convertit une liste de propriétés en liste de DTOs
 * @param {Array} properties - La liste de propriétés à convertir
 * @returns {Array<PropertyDto>} La liste des DTOs propriétés
 */
const toPropertyDtoList = (properties) => {
    if (!properties || !Array.isArray(properties)) return [];
    
    return properties.map(property => toPropertyDto(property));
};

/**
 * Prépare un objet pour la création d'une propriété
 * @param {CreatePropertyDto} createPropertyDto - Les données de la propriété à créer
 * @returns {Object} L'objet préparé pour la création
 */
const fromCreatePropertyDto = (createPropertyDto) => {
    return {
        title: createPropertyDto.title,
        image: createPropertyDto.image,
        description: createPropertyDto.description,
        price: createPropertyDto.price,
        property_type: createPropertyDto.property_type,
        transaction_type: createPropertyDto.transaction_type,
        address: createPropertyDto.address,
        city: createPropertyDto.city,
        postal_code: createPropertyDto.postal_code,
        surface_area: createPropertyDto.surface_area,
        rooms: createPropertyDto.rooms
    };
};

/**
 * Prépare un objet pour la mise à jour d'une propriété
 * @param {UpdatePropertyDto} updatePropertyDto - Les données de la propriété à mettre à jour
 * @returns {Object} L'objet préparé pour la mise à jour
 */
const fromUpdatePropertyDto = (updatePropertyDto) => {
    const updateData = {};
    
    if (updatePropertyDto.title !== undefined) updateData.title = updatePropertyDto.title;
    if (updatePropertyDto.image !== undefined) updateData.image = updatePropertyDto.image;
    if (updatePropertyDto.description !== undefined) updateData.description = updatePropertyDto.description;
    if (updatePropertyDto.price !== undefined) updateData.price = updatePropertyDto.price;
    if (updatePropertyDto.property_type !== undefined) updateData.property_type = updatePropertyDto.property_type;
    if (updatePropertyDto.transaction_type !== undefined) updateData.transaction_type = updatePropertyDto.transaction_type;
    if (updatePropertyDto.address !== undefined) updateData.address = updatePropertyDto.address;
    if (updatePropertyDto.city !== undefined) updateData.city = updatePropertyDto.city;
    if (updatePropertyDto.postal_code !== undefined) updateData.postal_code = updatePropertyDto.postal_code;
    if (updatePropertyDto.surface_area !== undefined) updateData.surface_area = updatePropertyDto.surface_area;
    if (updatePropertyDto.rooms !== undefined) updateData.rooms = updatePropertyDto.rooms;
    
    return updateData;
};

module.exports = {
    toPropertyDto,
    toPropertyDtoList,
    fromCreatePropertyDto,
    fromUpdatePropertyDto
};