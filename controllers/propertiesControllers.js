const propertiesService = require('../services/propertiesServices');
const { toPropertyDto, toPropertyDtoList, fromCreatePropertyDto, fromUpdatePropertyDto } = require('../mappers/propertiesMappers');

// Get all properties
exports.getAllProperties = async (req, res) => {
    try {
        const properties = await propertiesService.getAllProperties();
        res.status(200).json(properties);
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message });
    }
};

// Get a property by ID
exports.getPropertyById = async (req, res) => {
    try {
        const property = await propertiesService.getPropertyById(req.params.id);
        res.status(200).json({
            message: 'Property retrieved successfully',
            data: property
        });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message });
    }
};

// Create a new property
exports.createProperty = async (req, res) => {
    try {
        const uploadedFile = req.file ? {
            path: req.uploadedFile?.path,
            url: req.uploadedFile?.url,
            filename: req.file.filename
        } : null;
        
        const newProperty = await propertiesService.createProperty(req.body, uploadedFile);
        res.status(201).json(newProperty);
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message });
    }
};

// Update a property
exports.updateProperty = async (req, res) => {
    try {
        const uploadedFile = req.file ? {
            path: req.uploadedFile?.path,
            url: req.uploadedFile?.url,
            filename: req.file.filename
        } : null;
        
        const updatedProperty = await propertiesService.updateProperty(
            req.params.id,
            req.body,
            uploadedFile
        );
        
        res.status(200).json({
            message: 'Property updated successfully',
            data: updatedProperty
        });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message });
    }
};

// Delete a property
exports.deleteProperty = async (req, res) => {
    try {
        const result = await propertiesService.deleteProperty(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message });
    }
};

// Search properties
exports.searchProperties = async (req, res) => {
    try {
        const properties = await propertiesService.searchProperties(req.query);
        res.status(200).json(properties);
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message });
    }
};

// Toggle featured status
exports.toggleFeatured = async (req, res) => {
    try {
        const property = await propertiesService.toggleFeatured(req.params.id);
        res.status(200).json(property);
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message });
    }
};

// Update property status
exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const property = await propertiesService.updateStatus(req.params.id, status);
        res.status(200).json(property);
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message });
    }
};