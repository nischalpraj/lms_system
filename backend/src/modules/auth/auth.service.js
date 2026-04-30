const bcrypt = require('bcrypt');
const prisma = require('../../config/db');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken, hashToken, getRefreshTokenExpiry } = require('../../config/jwt');
const ApiError = require('../../utils/ApiError');
const env = require('../../config/env');

const BCRYPT_ROUNDS = parseInt(env.BCRYPT_ROUNDS, 10);

const SAFE_USER_SELECT = {
  user_id: true,
  full_name: true,
  email: true,
  role: true,
  is_active: true,
  lms_user_id: true,
  created_at: true,
};

const register = async ({ full_name, email, password, role, lms_user_id }) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw ApiError.conflict('Email already registered');

  const hashed = await bcrypt.hash(password, BCRYPT_ROUNDS);

  const user = await prisma.user.create({
    data: { full_name, email, password: hashed, role: role || 'student', lms_user_id },
    select: SAFE_USER_SELECT,
  });

  const { accessToken, refreshToken } = await _issueTokens(user.user_id, user.email);

  return { user, accessToken, refreshToken };
};

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.is_active) throw ApiError.unauthorized('Invalid credentials');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw ApiError.unauthorized('Invalid credentials');

  const { accessToken, refreshToken } = await _issueTokens(user.user_id, user.email);

  const safeUser = { ...user };
  delete safeUser.password;

  return { user: safeUser, accessToken, refreshToken };
};

const refresh = async (rawRefreshToken) => {
  let decoded;
  try {
    decoded = verifyRefreshToken(rawRefreshToken);
  } catch {
    throw ApiError.unauthorized('Invalid or expired refresh token');
  }

  const tokenHash = hashToken(rawRefreshToken);
  const stored = await prisma.refreshToken.findUnique({ where: { token_hash: tokenHash } });

  if (!stored || stored.revoked || stored.expires_at < new Date()) {
    throw ApiError.unauthorized('Refresh token invalid or revoked');
  }

  // Rotate: revoke old token
  await prisma.refreshToken.update({ where: { id: stored.id }, data: { revoked: true } });

  const { accessToken, refreshToken } = await _issueTokens(decoded.userId, decoded.email);
  return { accessToken, refreshToken };
};

const logout = async (rawRefreshToken) => {
  const tokenHash = hashToken(rawRefreshToken);
  await prisma.refreshToken.updateMany({
    where: { token_hash: tokenHash, revoked: false },
    data: { revoked: true },
  });
};

// ── Private ──────────────────────────────────────────────
const _issueTokens = async (userId, email) => {
  const payload = { userId, email };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  const tokenHash = hashToken(refreshToken);
  await prisma.refreshToken.create({
    data: {
      token_hash: tokenHash,
      user_id: userId,
      expires_at: getRefreshTokenExpiry(),
    },
  });

  return { accessToken, refreshToken };
};

module.exports = { register, login, refresh, logout };
