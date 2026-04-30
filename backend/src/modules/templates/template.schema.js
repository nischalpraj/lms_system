// template.schema.js
const { z } = require('zod');

const createTemplateSchema = z.object({
  resume_name: z.string().min(1).max(100),
  layout_type: z.enum(['single', 'double', 'minimal', 'modern']),
  theme_config: z.record(z.unknown()).optional(),
  is_active: z.boolean().default(true),
});

const updateTemplateSchema = createTemplateSchema.partial();

const listTemplatesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  layout_type: z.enum(['single', 'double', 'minimal', 'modern']).optional(),
  is_active: z.coerce.boolean().optional(),
});

module.exports = { createTemplateSchema, updateTemplateSchema, listTemplatesQuerySchema };
