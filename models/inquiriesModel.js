const mongoose = require('mongoose');

const inquiriesSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    property_id: {
        type: String,
        required: true
    },
    inquiry_type: {
        type: String,
        required: true,
        enum: ['visit_request', 'info_request', 'offer']
    },
    message: {
        type: String,
        required: false
    },
    preferred_date: {
        type: Date,
        required: false
    },
    preferred_time: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    },
    agent_response: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const Inquiries = mongoose.model('Inquiries', inquiriesSchema);

module.exports = Inquiries;

