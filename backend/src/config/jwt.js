const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const env = require('./env');

/**
 * Generate a signed access token (short-lived).
 */
const generateAccessToken = (payload) => {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN,
  });
};

/**
 * Generate a signed refresh token (long-lived).
 */
const generateRefreshToken = (payload) => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN,
  });
};

/**
 * Verify and decode an access token.
 */
const verifyAccessToken = (token) => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET);
};

/**
 * Verify and decode a refresh token.
 */
const verifyRefreshToken = (token) => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET);
};

/**
 * Hash a refresh token for secure storage.
 */
const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

/**
 * Calculate expiry date for refresh token.
 */
const getRefreshTokenExpiry = () => {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7); // 7 days
  return expiry;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  hashToken,
  getRefreshTokenExpiry,
};
