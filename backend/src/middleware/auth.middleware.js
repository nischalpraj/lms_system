const { verifyAccessToken } = require('../config/jwt');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const prisma = require('../config/db');

const authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw ApiError.unauthorized('Access token missing or malformed');
  }

  const token = authHeader.split(' ')[1];

  let decoded;
  try {
    decoded = verifyAccessToken(token);
  } catch (err) {
    throw ApiError.unauthorized('Invalid or expired access token');
  }

  const user = await prisma.user.findUnique({
    where: { user_id: decoded.userId },
    select: {
      user_id: true,
      full_name: true,
      email: true,
      role: true,
      is_active: true,
    },
  });

  if (!user) throw ApiError.unauthorized('User no longer exists');
  if (!user.is_active) throw ApiError.unauthorized('Account is deactivated');

  req.user = user;
  next();
});

module.exports = { authenticate };
