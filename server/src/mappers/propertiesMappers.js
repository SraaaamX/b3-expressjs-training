/**
 * Property mappers
 * These mappers convert between model objects and DTOs
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
        property.bedrooms,
        property.bathrooms,
        property.parking,
        property.garden,
        property.balcony,
        property.elevator,
        property.construction_year,
        property.availability_date,
        property.featured,
        property.status,
        property.agent_id,
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
        rooms: createPropertyDto.rooms,
        bedrooms: createPropertyDto.bedrooms,
        bathrooms: createPropertyDto.bathrooms,
        parking: createPropertyDto.parking,
        garden: createPropertyDto.garden,
        balcony: createPropertyDto.balcony,
        elevator: createPropertyDto.elevator,
        construction_year: createPropertyDto.construction_year,
        availability_date: createPropertyDto.availability_date,
        featured: createPropertyDto.featured,
        status: createPropertyDto.status,
        agent_id: createPropertyDto.agent_id
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
    if (updatePropertyDto.bedrooms !== undefined) updateData.bedrooms = updatePropertyDto.bedrooms;
    if (updatePropertyDto.bathrooms !== undefined) updateData.bathrooms = updatePropertyDto.bathrooms;
    if (updatePropertyDto.parking !== undefined) updateData.parking = updatePropertyDto.parking;
    if (updatePropertyDto.garden !== undefined) updateData.garden = updatePropertyDto.garden;
    if (updatePropertyDto.balcony !== undefined) updateData.balcony = updatePropertyDto.balcony;
    if (updatePropertyDto.elevator !== undefined) updateData.elevator = updatePropertyDto.elevator;
    if (updatePropertyDto.construction_year !== undefined) updateData.construction_year = updatePropertyDto.construction_year;
    if (updatePropertyDto.availability_date !== undefined) updateData.availability_date = updatePropertyDto.availability_date;
    if (updatePropertyDto.featured !== undefined) updateData.featured = updatePropertyDto.featured;
    if (updatePropertyDto.status !== undefined) updateData.status = updatePropertyDto.status;
    if (updatePropertyDto.agent_id !== undefined) updateData.agent_id = updatePropertyDto.agent_id;
    
    return updateData;
};

module.exports = {
    toPropertyDto,
    toPropertyDtoList,
    fromCreatePropertyDto,
    fromUpdatePropertyDto
};