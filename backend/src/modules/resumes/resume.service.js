const crypto = require('crypto');
const prisma = require('../../config/db');
const ApiError = require('../../utils/ApiError');
const { getPagination, buildMeta } = require('../../utils/pagination');

// ─── Full resume include ──────────────────────────────────
const RESUME_INCLUDE = {
  template: { select: { resume_id: true, resume_name: true, layout_type: true, theme_config: true } },
  education: { orderBy: { display_order: 'asc' } },
  workExperience: { orderBy: { display_order: 'asc' } },
  projects: { orderBy: { display_order: 'asc' } },
  certifications: { orderBy: { display_order: 'asc' } },
  languages: { orderBy: { display_order: 'asc' } },
  resumeSkills: {
    orderBy: { display_order: 'asc' },
    include: { skill: true },
  },
};

// ─── List ─────────────────────────────────────────────────
const listResumes = async (userId, query) => {
  const { skip, take, page, limit } = getPagination(query);
  const where = { user_id: userId, deletedAt: null };

  if (query.status) where.status = query.status;
  if (query.search) where.title = { contains: query.search, mode: 'insensitive' };

  const [resumes, total] = await Promise.all([
    prisma.resume.findMany({
      where,
      skip,
      take,
      orderBy: { updatedAt: 'desc' },
      include: { template: { select: { resume_name: true, layout_type: true } } },
    }),
    prisma.resume.count({ where }),
  ]);

  return { resumes, meta: buildMeta(total, page, limit) };
};

// ─── Get one ──────────────────────────────────────────────
const getResumeById = async (resumeId, userId, isAdmin = false) => {
  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, deletedAt: null },
    include: RESUME_INCLUDE,
  });

  if (!resume) throw ApiError.notFound('Resume not found');
  if (!isAdmin && resume.user_id !== userId) throw ApiError.forbidden('Access denied');

  return resume;
};

// ─── Get public (via share_token) ─────────────────────────
const getPublicResume = async (shareToken) => {
  const resume = await prisma.resume.findFirst({
    where: { share_token: shareToken, visibility: 'public', deletedAt: null },
    include: RESUME_INCLUDE,
  });
  if (!resume) throw ApiError.notFound('Resume not found or not public');
  return resume;
};

// ─── Create ───────────────────────────────────────────────
const createResume = async (userId, body) => {
  const { title, template_id, visibility } = body;

  // Verify template exists if provided
  if (template_id) {
    const tpl = await prisma.resumeTemplate.findFirst({ where: { resume_id: template_id, is_active: true } });
    if (!tpl) throw ApiError.notFound('Template not found');
  }

  const resume = await prisma.resume.create({
    data: { title, visibility, user_id: userId, template_id: template_id || null },
    include: RESUME_INCLUDE,
  });

  await _auditLog({ entity_type: 'Resume', entity_id: resume.id, action: 'created', new_values: { title }, performed_by: userId });

  return resume;
};

// ─── Update ───────────────────────────────────────────────
const updateResume = async (resumeId, userId, body, isAdmin = false) => {
  const existing = await _requireOwnership(resumeId, userId, isAdmin);

  if (body.template_id) {
    const tpl = await prisma.resumeTemplate.findFirst({ where: { resume_id: body.template_id, is_active: true } });
    if (!tpl) throw ApiError.notFound('Template not found');
  }

  const updated = await prisma.resume.update({
    where: { id: resumeId },
    data: body,
    include: RESUME_INCLUDE,
  });

  await _auditLog({ entity_type: 'Resume', entity_id: resumeId, action: 'updated', old_values: existing, new_values: body, performed_by: userId });

  return updated;
};

// ─── Delete (soft) ────────────────────────────────────────
const deleteResume = async (resumeId, userId, isAdmin = false) => {
  await _requireOwnership(resumeId, userId, isAdmin);

  await prisma.resume.update({
    where: { id: resumeId },
    data: { deletedAt: new Date(), status: 'archived' },
  });

  await _auditLog({ entity_type: 'Resume', entity_id: resumeId, action: 'deleted', performed_by: userId });
};

// ─── Sections ─────────────────────────────────────────────
const addSection = async (resumeId, userId, { type, data }, isAdmin = false) => {
  await _requireOwnership(resumeId, userId, isAdmin);

  let result;

  switch (type) {
    case 'education':
      result = await prisma.education.create({ data: { ...data, resume_id: resumeId } });
      break;
    case 'experience':
      result = await prisma.workExperience.create({ data: { ...data, resume_id: resumeId } });
      break;
    case 'skill':
      result = await _addSkill(resumeId, data);
      break;
    case 'project':
      result = await prisma.project.create({ data: { ...data, resume_id: resumeId } });
      break;
    case 'certification':
      result = await prisma.certification.create({ data: { ...data, resume_id: resumeId } });
      break;
    case 'language':
      result = await prisma.language.create({ data: { ...data, resume_id: resumeId } });
      break;
    default:
      throw ApiError.badRequest(`Unknown section type: ${type}`);
  }

  // Bump version snapshot
  await _bumpVersion(resumeId, userId, `Added ${type}`);

  return result;
};

const updateSection = async (resumeId, sectionId, userId, { type, data }, isAdmin = false) => {
  await _requireOwnership(resumeId, userId, isAdmin);

  let result;

  switch (type) {
    case 'education':
      result = await prisma.education.update({ where: { id: sectionId, resume_id: resumeId }, data });
      break;
    case 'experience':
      result = await prisma.workExperience.update({ where: { id: sectionId, resume_id: resumeId }, data });
      break;
    case 'skill':
      result = await prisma.resumeSkill.update({ where: { id: sectionId, resume_id: resumeId }, data });
      break;
    case 'project':
      result = await prisma.project.update({ where: { id: sectionId, resume_id: resumeId }, data });
      break;
    case 'certification':
      result = await prisma.certification.update({ where: { id: sectionId, resume_id: resumeId }, data });
      break;
    case 'language':
      result = await prisma.language.update({ where: { id: sectionId, resume_id: resumeId }, data });
      break;
    default:
      throw ApiError.badRequest(`Unknown section type: ${type}`);
  }

  await _bumpVersion(resumeId, userId, `Updated ${type}`);

  return result;
};

const deleteSection = async (resumeId, sectionId, userId, type, isAdmin = false) => {
  await _requireOwnership(resumeId, userId, isAdmin);

  switch (type) {
    case 'education':
      await prisma.education.delete({ where: { id: sectionId, resume_id: resumeId } });
      break;
    case 'experience':
      await prisma.workExperience.delete({ where: { id: sectionId, resume_id: resumeId } });
      break;
    case 'skill':
      await prisma.resumeSkill.delete({ where: { id: sectionId, resume_id: resumeId } });
      break;
    case 'project':
      await prisma.project.delete({ where: { id: sectionId, resume_id: resumeId } });
      break;
    case 'certification':
      await prisma.certification.delete({ where: { id: sectionId, resume_id: resumeId } });
      break;
    case 'language':
      await prisma.language.delete({ where: { id: sectionId, resume_id: resumeId } });
      break;
    default:
      throw ApiError.badRequest(`Unknown section type: ${type}`);
  }
};

// ─── Share link ───────────────────────────────────────────
const generateShareLink = async (resumeId, userId) => {
  await _requireOwnership(resumeId, userId);

  const shareToken = crypto.randomBytes(24).toString('hex');

  await prisma.resume.update({
    where: { id: resumeId },
    data: { share_token: shareToken, visibility: 'public' },
  });

  return { shareToken, url: `/resumes/public/${shareToken}` };
};

// ─── Private helpers ──────────────────────────────────────
const _requireOwnership = async (resumeId, userId, isAdmin = false) => {
  const resume = await prisma.resume.findFirst({ where: { id: resumeId, deletedAt: null } });
  if (!resume) throw ApiError.notFound('Resume not found');
  if (!isAdmin && resume.user_id !== userId) throw ApiError.forbidden('Access denied');
  return resume;
};

const _addSkill = async (resumeId, { skill_name, category, proficiency_level, display_order }) => {
  const normalized = skill_name.toLowerCase().trim();

  // Upsert skill globally
  const skill = await prisma.skill.upsert({
    where: { normalized_name: normalized },
    update: {},
    create: { name: skill_name, normalized_name: normalized, category },
  });

  // Link to resume (ignore duplicate)
  return prisma.resumeSkill.upsert({
    where: { resume_id_skill_id: { resume_id: resumeId, skill_id: skill.id } },
    update: { proficiency_level, display_order },
    create: { resume_id: resumeId, skill_id: skill.id, proficiency_level, display_order },
    include: { skill: true },
  });
};

const _bumpVersion = async (resumeId, userId, changeSummary) => {
  const resume = await prisma.resume.findUnique({
    where: { id: resumeId },
    include: RESUME_INCLUDE,
  });

  const newVersion = (resume.current_version || 0) + 1;

  await prisma.$transaction([
    prisma.resumeVersion.create({
      data: {
        resume_id: resumeId,
        version_number: newVersion,
        snapshot: resume,
        change_summary: changeSummary,
        created_by: userId,
      },
    }),
    prisma.resume.update({
      where: { id: resumeId },
      data: { current_version: newVersion },
    }),
  ]);
};

const _auditLog = async ({ entity_type, entity_id, action, old_values, new_values, performed_by, ip_address }) => {
  await prisma.auditLog.create({
    data: { entity_type, entity_id, action, old_values, new_values, performed_by, ip_address },
  }).catch(() => {}); // Non-blocking — don't fail request if audit fails
};

module.exports = {
  listResumes,
  getResumeById,
  getPublicResume,
  createResume,
  updateResume,
  deleteResume,
  addSection,
  updateSection,
  deleteSection,
  generateShareLink,
};
