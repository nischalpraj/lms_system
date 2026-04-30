const prisma = require('../../config/db');
const ApiError = require('../../utils/ApiError');
const { getPagination, buildMeta } = require('../../utils/pagination');

const SAFE_SELECT = {
  user_id: true,
  full_name: true,
  email: true,
  role: true,
  is_active: true,
  lms_user_id: true,
  created_at: true,
  updated_at: true,
};

const getMe = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { user_id: userId },
    select: SAFE_SELECT,
  });
  if (!user) throw ApiError.notFound('User not found');
  return user;
};

const updateMe = async (userId, data) => {
  if (data.email) {
    const conflict = await prisma.user.findFirst({
      where: { email: data.email, NOT: { user_id: userId } },
    });
    if (conflict) throw ApiError.conflict('Email already in use');
  }

  return prisma.user.update({
    where: { user_id: userId },
    data,
    select: SAFE_SELECT,
  });
};

const listUsers = async (query) => {
  const { skip, take, page, limit } = getPagination(query);
  const where = {};

  if (query.role) where.role = query.role;
  if (query.search) {
    where.OR = [
      { full_name: { contains: query.search, mode: 'insensitive' } },
      { email: { contains: query.search, mode: 'insensitive' } },
    ];
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({ where, skip, take, select: SAFE_SELECT, orderBy: { created_at: 'desc' } }),
    prisma.user.count({ where }),
  ]);

  return { users, meta: buildMeta(total, page, limit) };
};

module.exports = { getMe, updateMe, listUsers };
