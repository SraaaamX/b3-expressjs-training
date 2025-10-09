const Properties = require('../models/propertiesModel');

// Get all properties
exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Properties.find();
        if (!properties.length) {
            return res.status(404).json({ error: 'No properties found' });
        }
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a property by ID
exports.getPropertyById = async (req, res) => {
    try {
        const property = await Properties.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }
        res.status(200).json({
            message: 'Property retrieved successfully',
            data: property
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new property
exports.createProperty = async (req, res) => {
    try {
        const { title, description, price, property_type, transaction_type, address, city } = req.body;
        
        // Vérification des champs obligatoires
        if (!title || !price || !property_type || !transaction_type || !address || !city) {
            return res.status(400).json({ error: 'Required fields are missing' });
        }
        
        const newProperty = await Properties.create(req.body);
        res.status(201).json(newProperty);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a property
exports.updateProperty = async (req, res) => {
    try {
        const updatedProperty = await Properties.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!updatedProperty) {
            return res.status(404).json({ error: 'Property not found' });
        }
        
        res.status(200).json({
            message: 'Property updated successfully',
            data: updatedProperty
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a property
exports.deleteProperty = async (req, res) => {
    try {
        const deletedProperty = await Properties.findByIdAndDelete(req.params.id);
        
        if (!deletedProperty) {
            return res.status(404).json({ error: 'Property not found' });
        }
        
        res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search properties
exports.searchProperties = async (req, res) => {
    try {
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
        } = req.query;
        
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
            return res.status(404).json({ error: 'No properties found matching the criteria' });
        }
        
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Toggle featured status
exports.toggleFeatured = async (req, res) => {
    try {
        const property = await Properties.findById(req.params.id);
        
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }
        
        property.featured = !property.featured;
        await property.save();
        
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update property status
exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        
        if (!status || !['available', 'sold', 'rented', 'pending'].includes(status)) {
            return res.status(400).json({ error: 'Valid status is required' });
        }
        
        const property = await Properties.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }
        
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};