const mongoose = require('mongoose');

const propertiesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: null
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    property_type: {
        type: String,
        required: true,
        enum: ['house', 'apartment', 'villa', 'studio', 'office', 'land']
    },
    transaction_type: {
        type: String,
        required: true,
        enum: ['sale', 'rent']
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postal_code: {
        type: String,
        required: false
    },
    surface_area: {
        type: Number,
        required: false
    },
    rooms: {
        type: Number,
        required: false
    },
    bedrooms: {
        type: Number,
        required: false
    },
    bathrooms: {
        type: Number,
        required: false
    },
    parking: {
        type: Boolean,
        required: false,
        default: false
    },
    garden: {
        type: Boolean,
        required: false,
        default: false
    },
    balcony: {
        type: Boolean,
        required: false,
        default: false
    },
    elevator: {
        type: Boolean,
        required: false,
        default: false
    },
    construction_year: {
        type: Number,
        required: false
    },
    availability_date: {
        type: Date,
        required: false
    },
    featured: {
        type: Boolean,
        required: false,
        default: false
    },
    status: {
        type: String,
        required: false,
        enum: ['available', 'sold', 'rented', 'pending'],
        default: 'available'
    },
    agent_id: {
        type: Number,
        required: false
    }
}, {
    timestamps: true
});

const Properties = mongoose.model('Properties', propertiesSchema);

module.exports = Properties;

