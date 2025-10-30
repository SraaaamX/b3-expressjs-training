/**
 * Validation middleware using Joi
 * This middleware validates request data against defined schemas
 */

const createValidationMiddleware = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false });
    
    if (!error) {
      return next();
    }

    const errors = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    }));

    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors
    });
  };
};

module.exports = createValidationMiddleware;