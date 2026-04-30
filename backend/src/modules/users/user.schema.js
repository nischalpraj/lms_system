const { z } = require('zod');

const updateMeSchema = z.object({
  full_name: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: 'At least one field must be provided',
});

const listUsersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  role: z.enum(['admin', 'student', 'HR']).optional(),
  search: z.string().optional(),
});

module.exports = { updateMeSchema, listUsersQuerySchema };
