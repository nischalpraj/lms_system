const { z } = require('zod');

const createResumeSchema = z.object({
  title: z.string().min(1).max(200),
  template_id: z.string().optional(),
  visibility: z.enum(['private', 'shared', 'public']).default('private'),
});

const updateResumeSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  template_id: z.string().nullable().optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  visibility: z.enum(['private', 'shared', 'public']).optional(),
}).refine((d) => Object.keys(d).length > 0, { message: 'At least one field required' });

const listResumesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  search: z.string().optional(),
});

// Section schemas
const educationSchema = z.object({
  institution: z.string().min(1),
  degree: z.string().min(1),
  field_of_study: z.string().optional(),
  gpa: z.number().min(0).max(4).optional(),
  start_date: z.coerce.date(),
  end_date: z.coerce.date().optional(),
  display_order: z.number().int().default(0),
});

const workExperienceSchema = z.object({
  company: z.string().min(1),
  position: z.string().min(1),
  location: z.string().optional(),
  description: z.string().optional(),
  start_date: z.coerce.date(),
  end_date: z.coerce.date().optional(),
  is_current: z.boolean().default(false),
  display_order: z.number().int().default(0),
});

const skillSectionSchema = z.object({
  skill_name: z.string().min(1),
  category: z.string().optional(),
  proficiency_level: z.enum(['beginner', 'intermediate', 'expert']).default('beginner'),
  display_order: z.number().int().default(0),
});

const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  url: z.string().url().optional(),
  start_date: z.coerce.date().optional(),
  end_date: z.coerce.date().optional(),
  display_order: z.number().int().default(0),
});

const certificationSchema = z.object({
  name: z.string().min(1),
  issuing_org: z.string().min(1),
  credential_id: z.string().optional(),
  credential_url: z.string().url().optional(),
  issue_date: z.coerce.date(),
  expiry_date: z.coerce.date().optional(),
  display_order: z.number().int().default(0),
});

const languageSchema = z.object({
  language: z.string().min(1),
  proficiency: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'native']),
  display_order: z.number().int().default(0),
});

const addSectionSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('education'), data: educationSchema }),
  z.object({ type: z.literal('experience'), data: workExperienceSchema }),
  z.object({ type: z.literal('skill'), data: skillSectionSchema }),
  z.object({ type: z.literal('project'), data: projectSchema }),
  z.object({ type: z.literal('certification'), data: certificationSchema }),
  z.object({ type: z.literal('language'), data: languageSchema }),
]);

const updateSectionSchema = z.object({
  type: z.enum(['education', 'experience', 'skill', 'project', 'certification', 'language']),
  data: z.record(z.unknown()),
});

module.exports = {
  createResumeSchema,
  updateResumeSchema,
  listResumesQuerySchema,
  addSectionSchema,
  updateSectionSchema,
  educationSchema,
  workExperienceSchema,
  skillSectionSchema,
  projectSchema,
  certificationSchema,
  languageSchema,
};
