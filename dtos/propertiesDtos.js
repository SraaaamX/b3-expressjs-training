/**
 * DTOs for properties
 */

/**
 * Data transfer object that represents a property when it is sent back to the client
 */
class PropertyDto {
    constructor(id, title, image, description, price, property_type, transaction_type, 
                address, city, postal_code, surface_area, rooms, createdAt, updatedAt) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.description = description;
        this.price = price;
        this.property_type = property_type;
        this.transaction_type = transaction_type;
        this.address = address;
        this.city = city;
        this.postal_code = postal_code;
        this.surface_area = surface_area;
        this.rooms = rooms;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

/**
 * Data transfer object used when a new property is being created
 */
class CreatePropertyDto {
    constructor(title, image, description, price, property_type, transaction_type, 
                address, city, postal_code, surface_area, rooms) {
        this.title = title;
        this.image = image;
        this.description = description;
        this.price = price;
        this.property_type = property_type;
        this.transaction_type = transaction_type;
        this.address = address;
        this.city = city;
        this.postal_code = postal_code;
        this.surface_area = surface_area;
        this.rooms = rooms;
    }
}

/**
 * Data transfer object that carries only the fields meant to be updated on an existing property
 */
class UpdatePropertyDto {
    constructor(data = {}) {
        if (data.title !== undefined) this.title = data.title;
        if (data.image !== undefined) this.image = data.image;
        if (data.description !== undefined) this.description = data.description;
        if (data.price !== undefined) this.price = data.price;
        if (data.property_type !== undefined) this.property_type = data.property_type;
        if (data.transaction_type !== undefined) this.transaction_type = data.transaction_type;
        if (data.address !== undefined) this.address = data.address;
        if (data.city !== undefined) this.city = data.city;
        if (data.postal_code !== undefined) this.postal_code = data.postal_code;
        if (data.surface_area !== undefined) this.surface_area = data.surface_area;
        if (data.rooms !== undefined) this.rooms = data.rooms;
    }
}

module.exports = {
    PropertyDto,
    CreatePropertyDto,
    UpdatePropertyDto
};