const Properties = require('../models/propertiesModel');
const path = require('path');
const { deleteUploadedFile } = require('../middlewares/uploadMiddleware');
const { toPropertyDto, toPropertyDtoList, fromCreatePropertyDto, fromUpdatePropertyDto } = require('../mappers/propertiesMappers');

class PropertiesService {
    /**
     * Récupère toutes les propriétés
     */
    async getAllProperties() {
        const properties = await Properties.find();
        if (!properties.length) {
            throw { status: 404, message: 'No properties found' };
        }
        return toPropertyDtoList(properties);
    }

    async getPropertyById(propertyId) {
        const property = await Properties.findById(propertyId);
        if (!property) {
            throw { status: 404, message: 'Property not found' };
        }
        return toPropertyDto(property);
    }

    async createProperty(propertyData, uploadedFile = null) {
        const { title, price, property_type, transaction_type, address, city } = propertyData;
        
        // Validation des champs obligatoires
        if (!title || !price || !property_type || !transaction_type || !address || !city) {
            if (uploadedFile) {
                deleteUploadedFile(uploadedFile.path);
            }
            throw { status: 400, message: 'Required fields are missing' };
        }
        
        const newPropertyData = fromCreatePropertyDto(propertyData);
        
        // Ajout de l'image si elle existe
        if (uploadedFile) {
            newPropertyData.image = uploadedFile.url || `/uploads/properties/${uploadedFile.filename}`;
        }
        
        const newProperty = await Properties.create(newPropertyData);
        return toPropertyDto(newProperty);
    }

    async updateProperty(propertyId, updates, uploadedFile = null) {
        const updateData = fromUpdatePropertyDto(updates);
        
        // Récupération de la propriété actuelle pour gérer l'ancienne image
        const currentProperty = await Properties.findById(propertyId);
        
        // Gestion de la nouvelle image
        if (uploadedFile) {
            // Suppression de l'ancienne image si elle existe
            if (currentProperty && currentProperty.image) {
                const oldImagePath = path.join(__dirname, '../public', currentProperty.image);
                deleteUploadedFile(oldImagePath);
            }
            
            updateData.image = uploadedFile.url || `/uploads/properties/${uploadedFile.filename}`;
        }
        
        // Mise à jour de la propriété
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
     * Supprime une propriété
     * @param {string} propertyId - ID de la propriété
     */
    async deleteProperty(propertyId) {
        const deletedProperty = await Properties.findByIdAndDelete(propertyId);
        
        if (!deletedProperty) {
            throw { status: 404, message: 'Property not found' };
        }
        
        return { message: 'Property deleted successfully' };
    }

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

    async toggleFeatured(propertyId) {
        const property = await Properties.findById(propertyId);
        
        if (!property) {
            throw { status: 404, message: 'Property not found' };
        }
        
        property.featured = !property.featured;
        await property.save();
        
        return property;
    }

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