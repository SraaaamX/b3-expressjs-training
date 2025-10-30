const Joi = require('joi');

// Schema for user registration
const registerUserSchema = Joi.object({
  username: Joi.string().required().min(3).max(30).messages({
    'string.empty': 'Username is required',
    'string.min': 'Username must be at least 3 characters long',
    'string.max': 'Username cannot exceed 30 characters',
    'any.required': 'Username is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email is required',
    'any.required': 'Email is required'
  }),
  password: Joi.string().required().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 8 characters long',
    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    'any.required': 'Password is required'
  }),
  firstName: Joi.string().required().messages({
    'string.empty': 'First name is required',
    'any.required': 'First name is required'
  }),
  lastName: Joi.string().required().messages({
    'string.empty': 'Last name is required',
    'any.required': 'Last name is required'
  }),
  role: Joi.string().valid('user', 'agent', 'admin').default('user').messages({
    'any.only': 'Role must be one of: user, agent, admin'
  }),
  phone: Joi.string().pattern(/^[0-9+\-\s()]{8,20}$/).messages({
    'string.pattern.base': 'Please provide a valid phone number'
  })
});

// Schema for user login
const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email is required',
    'any.required': 'Email is required'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
    'any.required': 'Password is required'
  })
});

// Schema for updating user
const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).messages({
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name cannot exceed 30 characters'
  }),
  nickname: Joi.string().min(3).max(30).messages({
    'string.min': 'Nickname must be at least 3 characters long',
    'string.max': 'Nickname cannot exceed 30 characters'
  }),
  email: Joi.string().email().messages({
    'string.email': 'Please provide a valid email address'
  }),
  profilepic: Joi.string(),
  password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).messages({
    'string.min': 'Password must be at least 8 characters long',
    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  }),
  phone: Joi.string().pattern(/^[0-9+\-\s()]{8,20}$/).messages({
    'string.pattern.base': 'Please provide a valid phone number'
  }),
  role: Joi.string().valid('user', 'agent', 'admin').messages({
    'any.only': 'Role must be one of: user, agent, admin'
  })
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

// Schema for changing password
const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    'string.empty': 'Current password is required',
    'any.required': 'Current password is required'
  }),
  newPassword: Joi.string().required().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).messages({
    'string.empty': 'New password is required',
    'string.min': 'New password must be at least 8 characters long',
    'string.pattern.base': 'New password must contain at least one uppercase letter, one lowercase letter, and one number',
    'any.required': 'New password is required'
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref('newPassword')).messages({
    'string.empty': 'Confirm password is required',
    'any.only': 'Passwords do not match',
    'any.required': 'Confirm password is required'
  })
});

module.exports = {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
  changePasswordSchema
};