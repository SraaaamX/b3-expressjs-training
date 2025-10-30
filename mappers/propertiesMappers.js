/**
 * Property mappers
 */

const { PropertyDto, CreatePropertyDto, UpdatePropertyDto } = require('../dtos/propertiesDtos');

/**
 * Converts a property object to a DTO for API response
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
 * Converts a list of properties to a list of DTOs
 */
const toPropertyDtoList = (properties) => {
    if (!properties || !Array.isArray(properties)) return [];
    
    return properties.map(property => toPropertyDto(property));
};

/**
 * Prepares an object for property creation
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
 * Prepares an object for property update
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