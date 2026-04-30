const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const env = require('../config/env');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // Log internally — never expose raw errors to client
  if (env.NODE_ENV !== 'test') {
    console.error(`[ERROR] ${req.method} ${req.originalUrl}`, {
      message: err.message,
      stack: env.NODE_ENV === 'development' ? err.stack : undefined,
    });
  }

  // Known operational errors (ApiError instances)
  if (err instanceof ApiError || err.isOperational) {
    return ApiResponse.error(res, err.statusCode, err.message, err.details);
  }

  // Prisma unique constraint violation → 409
  if (err.code === 'P2002') {
    const field = err.meta?.target?.join(', ') || 'field';
    return ApiResponse.error(res, 409, `Duplicate value for ${field}`);
  }

  // Prisma record not found → 404
  if (err.code === 'P2025') {
    return ApiResponse.error(res, 404, 'Record not found');
  }

  // JWT errors → 401
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return ApiResponse.error(res, 401, 'Invalid or expired token');
  }

  // Fallback — hide internals in production
  const message = env.NODE_ENV === 'production' ? 'Internal server error' : err.message;
  return ApiResponse.error(res, 500, message);
};

module.exports = { errorHandler };
