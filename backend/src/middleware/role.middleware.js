const ApiError = require('../utils/ApiError');

/**
 * Allow only specified roles. Must be used after authenticate middleware.
 * @param {...string} roles - allowed role names
 */
const requireRole = (...roles) => (req, res, next) => {
  if (!req.user) {
    return next(ApiError.unauthorized());
  }

  if (!roles.includes(req.user.role)) {
    return next(ApiError.forbidden('Insufficient permissions'));
  }

  next();
};

const requireAdmin = requireRole('admin');

module.exports = { requireRole, requireAdmin };
