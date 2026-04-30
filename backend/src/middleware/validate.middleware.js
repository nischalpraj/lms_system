const ApiError = require('../utils/ApiError');

/**
 * Validates req.body against a Zod schema.
 * Passes ZodError details to the global error handler as 400.
 */
const validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const details = result.error.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return next(ApiError.badRequest('Validation failed', details));
  }
  req.body = result.data; // use parsed/coerced data
  next();
};

/**
 * Validates req.query against a Zod schema.
 */
const validateQuery = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.query);
  if (!result.success) {
    const details = result.error.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return next(ApiError.badRequest('Invalid query parameters', details));
  }
  req.query = result.data;
  next();
};

/**
 * Validates req.params against a Zod schema.
 */
const validateParams = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.params);
  if (!result.success) {
    const details = result.error.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return next(ApiError.badRequest('Invalid route parameters', details));
  }
  req.params = result.data;
  next();
};

module.exports = { validateBody, validateQuery, validateParams };
