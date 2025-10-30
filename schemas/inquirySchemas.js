const Joi = require('joi');

// Schema for creating a new inquiry
const createInquirySchema = Joi.object({
  user_id: Joi.string().required().messages({
    'string.empty': 'User ID is required',
    'any.required': 'User ID is required'
  }),
  property_id: Joi.string().required().messages({
    'string.empty': 'Property ID is required',
    'any.required': 'Property ID is required'
  }),
  inquiry_type: Joi.string().valid('visit_request', 'info_request', 'offer').required().messages({
    'string.empty': 'Inquiry type is required',
    'any.only': 'Inquiry type must be one of: visit_request, info_request, offer',
    'any.required': 'Inquiry type is required'
  }),
  message: Joi.string().min(10).max(1000).messages({
    'string.min': 'Message must be at least 10 characters long',
    'string.max': 'Message cannot exceed 1000 characters'
  }),
  preferred_date: Joi.date().messages({
    'date.base': 'Please provide a valid date'
  }),
  preferred_time: Joi.string().messages({
    'string.base': 'Please provide a valid time'
  })
});

// Schema for updating an inquiry
const updateInquirySchema = Joi.object({
  property_id: Joi.string().messages({
    'string.empty': 'Property ID cannot be empty'
  }),
  user_id: Joi.string().messages({
    'string.empty': 'User ID cannot be empty'
  }),
  inquiry_type: Joi.string().valid('visit_request', 'info_request', 'offer').messages({
    'string.empty': 'Inquiry type cannot be empty',
    'any.only': 'Inquiry type must be one of: visit_request, info_request, offer'
  }),
  message: Joi.string().min(10).max(1000).messages({
    'string.min': 'Message must be at least 10 characters long',
    'string.max': 'Message cannot exceed 1000 characters'
  }),
  preferred_date: Joi.date().messages({
    'date.base': 'Please provide a valid date'
  }),
  preferred_time: Joi.string().messages({
    'string.base': 'Please provide a valid time'
  }),
  status: Joi.string().valid('pending', 'confirmed', 'completed', 'cancelled').messages({
    'string.empty': 'Status cannot be empty',
    'any.only': 'Status must be one of: pending, confirmed, completed, cancelled'
  }),
  agent_response: Joi.string().max(1000).messages({
    'string.max': 'Agent response cannot exceed 1000 characters'
  })
});

// Schema for agent response
const responseSchema = Joi.object({
  response: Joi.string().required().min(10).max(1000).messages({
    'string.empty': 'Response is required',
    'string.min': 'Response must be at least 10 characters long',
    'string.max': 'Response cannot exceed 1000 characters',
    'any.required': 'Response is required'
  })
});

module.exports = {
  createInquirySchema,
  updateInquirySchema,
  responseSchema
};