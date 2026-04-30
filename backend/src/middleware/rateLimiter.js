const rateLimit = require('express-rate-limit');

/**
 * Strict rate limiter for auth endpoints (prevent brute-force).
 * 20 requests per 15 minutes per IP.
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again after 15 minutes',
    code: 429,
  },
});

/**
 * General API rate limiter.
 * 100 requests per 15 minutes per IP.
 */
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests, please slow down',
    code: 429,
  },
});

module.exports = { authLimiter, generalLimiter };
