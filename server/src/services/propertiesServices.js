const Properties = require('../models/propertiesModel');
const path = require('path');
const { deleteUploadedFile } = require('../middlewares/uploadMiddleware');
const { toPropertyDto, toPropertyDtoList, fromCreatePropertyDto, fromUpdatePropertyDto } = require('../mappers/propertiesMappers');

class PropertiesService {
    /**
     * Retrieves all properties from the database
     */
    async getAllProperties() {
        const properties = await Properties.find();
        if (!properties.length) {
            throw { status: 404, message: 'No properties found' };
        }
        return toPropertyDtoList(properties);
    }

    /**
     * Retrieves a single property by its unique identifier
     */
    async getPropertyById(propertyId) {
        const property = await Properties.findById(propertyId);
        if (!property) {
            throw { status: 404, message: 'Property not found' };
        }
        return toPropertyDto(property);
    }

    /**
     * Creates a new property with the provided data and optional image
     */
    async createProperty(propertyData, uploadedFile = null) {
        const { title, price, property_type, transaction_type, address, city } = propertyData;
        
        // Validation of mandatory fields
        if (!title || !price || !property_type || !transaction_type || !address || !city) {
            if (uploadedFile) {
                deleteUploadedFile(uploadedFile.path);
            }
            throw { status: 400, message: 'Required fields are missing' };
        }
        
        const newPropertyData = fromCreatePropertyDto(propertyData);
        
        // Addition of the image if it exists
        if (uploadedFile) {
            newPropertyData.image = uploadedFile.url || `/uploads/properties/${uploadedFile.filename}`;
        }
        
        const newProperty = await Properties.create(newPropertyData);
        return toPropertyDto(newProperty);
    }

    /**
     * Updates an existing property with new data and optionally replaces its image
     */
    async updateProperty(propertyId, updates, uploadedFile = null) {
        const updateData = fromUpdatePropertyDto(updates);
        
        // Retrieval of the current property to handle the old image
        const currentProperty = await Properties.findById(propertyId);
        
        // Handling of the new image
        if (uploadedFile) {
            // Deletion of the old image if it exists
            if (currentProperty && currentProperty.image) {
                const oldImagePath = path.join(__dirname, '../../public', currentProperty.image);
                deleteUploadedFile(oldImagePath);
            }
            
            updateData.image = uploadedFile.url || `/uploads/properties/${uploadedFile.filename}`;
        }
        
        // Update of the property
        const updatedProperty = await Properties.findByIdAndUpdate(
            propertyId,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!updatedProperty) {
            if (uploadedFile) {
                deleteUploadedFile(uploadedFile.path);
            }
            throw { status: 404, message: 'Property not found' };
        }
        
        return toPropertyDto(updatedProperty);
    }

    /**
     * Deletes a property and its associated image
     */
    async deleteProperty(propertyId) {
        const deletedProperty = await Properties.findByIdAndDelete(propertyId);
        
        if (!deletedProperty) {
            throw { status: 404, message: 'Property not found' };
        }
        
        // Deletion of the associated image if it exists
        if (deletedProperty.image) {
            const imagePath = path.join(__dirname, '../../public', deletedProperty.image);
            deleteUploadedFile(imagePath);
        }
        
        return { message: 'Property deleted successfully' };
    }

    /**
     * Searches for properties matching the given criteria
     */
    async searchProperties(searchCriteria) {
        const { 
            property_type, 
            transaction_type, 
            city, 
            min_price, 
            max_price,
            min_surface,
            max_surface,
            rooms,
            status
        } = searchCriteria;
        
        const filter = {};
        
        if (property_type) filter.property_type = property_type;
        if (transaction_type) filter.transaction_type = transaction_type;
        if (city) filter.city = { $regex: city, $options: 'i' };
        if (status) filter.status = status;
        
        if (min_price || max_price) {
            filter.price = {};
            if (min_price) filter.price.$gte = Number(min_price);
            if (max_price) filter.price.$lte = Number(max_price);
        }
        
        if (min_surface || max_surface) {
            filter.surface_area = {};
            if (min_surface) filter.surface_area.$gte = Number(min_surface);
            if (max_surface) filter.surface_area.$lte = Number(max_surface);
        }
        
        if (rooms) filter.rooms = Number(rooms);
        
        const properties = await Properties.find(filter);
        
        if (!properties.length) {
            throw { status: 404, message: 'No properties found matching the criteria' };
        }
        
        return properties;
    }

    /**
     * Toggles the featured status of a property
     */
    async toggleFeatured(propertyId) {
        const property = await Properties.findById(propertyId);
        
        if (!property) {
            throw { status: 404, message: 'Property not found' };
        }
        
        property.featured = !property.featured;
        await property.save();
        
        return property;
    }

    /**
     * Updates the status of a property to one of the predefined values
     */
    async updateStatus(propertyId, status) {
        const validStatuses = ['available', 'sold', 'rented', 'pending'];
        
        if (!status || !validStatuses.includes(status)) {
            throw { status: 400, message: 'Valid status is required' };
        }
        
        const property = await Properties.findByIdAndUpdate(
            propertyId,
            { status },
            { new: true }
        );
        
        if (!property) {
            throw { status: 404, message: 'Property not found' };
        }
        
        return property;
    }
}

module.exports = new PropertiesService();