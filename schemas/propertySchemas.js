const Joi = require('joi');

// Schema for creating a new property
const createPropertySchema = Joi.object({
  title: Joi.string().required().min(5).max(100).messages({
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least 5 characters long',
    'string.max': 'Title cannot exceed 100 characters',
    'any.required': 'Title is required'
  }),
  description: Joi.string().required().min(20).max(2000).messages({
    'string.empty': 'Description is required',
    'string.min': 'Description must be at least 20 characters long',
    'string.max': 'Description cannot exceed 2000 characters',
    'any.required': 'Description is required'
  }),
  price: Joi.number().required().positive().messages({
    'number.base': 'Price must be a number',
    'number.positive': 'Price must be a positive number',
    'any.required': 'Price is required'
  }),
  location: Joi.string().required().messages({
    'string.empty': 'Location is required',
    'any.required': 'Location is required'
  }),
  bedrooms: Joi.number().integer().min(0).messages({
    'number.base': 'Bedrooms must be a number',
    'number.integer': 'Bedrooms must be an integer',
    'number.min': 'Bedrooms cannot be negative'
  }),
  bathrooms: Joi.number().integer().min(0).messages({
    'number.base': 'Bathrooms must be a number',
    'number.integer': 'Bathrooms must be an integer',
    'number.min': 'Bathrooms cannot be negative'
  }),
  propertyType: Joi.string().valid('apartment', 'house', 'condo', 'villa', 'land', 'commercial').messages({
    'any.only': 'Property type must be one of: apartment, house, condo, villa, land, commercial'
  }),
  status: Joi.string().valid('for-sale', 'for-rent', 'sold', 'rented').default('for-sale').messages({
    'any.only': 'Status must be one of: for-sale, for-rent, sold, rented'
  })
});

// Schema for updating a property
const updatePropertySchema = Joi.object({
  title: Joi.string().min(5).max(100).messages({
    'string.min': 'Title must be at least 5 characters long',
    'string.max': 'Title cannot exceed 100 characters'
  }),
  description: Joi.string().min(20).max(2000).messages({
    'string.min': 'Description must be at least 20 characters long',
    'string.max': 'Description cannot exceed 2000 characters'
  }),
  price: Joi.number().positive().messages({
    'number.base': 'Price must be a number',
    'number.positive': 'Price must be a positive number'
  }),
  location: Joi.string(),
  bedrooms: Joi.number().integer().min(0).messages({
    'number.base': 'Bedrooms must be a number',
    'number.integer': 'Bedrooms must be an integer',
    'number.min': 'Bedrooms cannot be negative'
  }),
  bathrooms: Joi.number().integer().min(0).messages({
    'number.base': 'Bathrooms must be a number',
    'number.integer': 'Bathrooms must be an integer',
    'number.min': 'Bathrooms cannot be negative'
  }),
  propertyType: Joi.string().valid('apartment', 'house', 'condo', 'villa', 'land', 'commercial').messages({
    'any.only': 'Property type must be one of: apartment, house, condo, villa, land, commercial'
  }),
  status: Joi.string().valid('for-sale', 'for-rent', 'sold', 'rented').messages({
    'any.only': 'Status must be one of: for-sale, for-rent, sold, rented'
  })
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

// Schema for toggling featured status
const toggleFeaturedSchema = Joi.object({
  featured: Joi.boolean().required().messages({
    'boolean.base': 'Featured must be a boolean value',
    'any.required': 'Featured status is required'
  })
});

// Schema for updating property status
const updateStatusSchema = Joi.object({
  status: Joi.string().valid('for-sale', 'for-rent', 'sold', 'rented').required().messages({
    'any.only': 'Status must be one of: for-sale, for-rent, sold, rented',
    'any.required': 'Status is required'
  })
});

module.exports = {
  createPropertySchema,
  updatePropertySchema,
  toggleFeaturedSchema,
  updateStatusSchema
};