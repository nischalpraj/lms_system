const prisma = require('../../config/db');
const ApiError = require('../../utils/ApiError');
const { getPagination, buildMeta } = require('../../utils/pagination');

const listTemplates = async (query) => {
  const { skip, take, page, limit } = getPagination(query);
  const where = {};

  if (query.layout_type) where.layout_type = query.layout_type;
  if (query.is_active !== undefined) where.is_active = query.is_active;
  else where.is_active = true; // default: only active

  const [templates, total] = await Promise.all([
    prisma.resumeTemplate.findMany({ where, skip, take, orderBy: { createdAt: 'desc' } }),
    prisma.resumeTemplate.count({ where }),
  ]);

  return { templates, meta: buildMeta(total, page, limit) };
};

const getTemplateById = async (id) => {
  const template = await prisma.resumeTemplate.findUnique({ where: { resume_id: id } });
  if (!template) throw ApiError.notFound('Template not found');
  return template;
};

const createTemplate = async (data) => {
  return prisma.resumeTemplate.create({ data });
};

const updateTemplate = async (id, data) => {
  const template = await prisma.resumeTemplate.findUnique({ where: { resume_id: id } });
  if (!template) throw ApiError.notFound('Template not found');

  return prisma.resumeTemplate.update({ where: { resume_id: id }, data });
};

const deleteTemplate = async (id) => {
  const template = await prisma.resumeTemplate.findUnique({ where: { resume_id: id } });
  if (!template) throw ApiError.notFound('Template not found');

  await prisma.resumeTemplate.update({ where: { resume_id: id }, data: { is_active: false } });
};

module.exports = { listTemplates, getTemplateById, createTemplate, updateTemplate, deleteTemplate };
