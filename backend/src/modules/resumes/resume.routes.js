const express = require('express');
const controller = require('./resume.controller');
const { authenticate } = require('../../middleware/auth.middleware');
const { validateBody, validateQuery } = require('../../middleware/validate.middleware');
const {
  createResumeSchema,
  updateResumeSchema,
  listResumesQuerySchema,
  addSectionSchema,
  updateSectionSchema,
} = require('./resume.schema');
const { z } = require('zod');

const router = express.Router();

// ── Public endpoint ────────────────────────────────────────
router.get('/public/:shareToken', controller.getPublicResume);

// ── Protected ──────────────────────────────────────────────
router.use(authenticate);

// Resume CRUD
router.get('/', validateQuery(listResumesQuerySchema), controller.listResumes);
router.post('/', validateBody(createResumeSchema), controller.createResume);
router.get('/:id', controller.getResume);
router.put('/:id', validateBody(updateResumeSchema), controller.updateResume);
router.delete('/:id', controller.deleteResume);

// Share link
router.get('/:id/share', controller.getShareLink);

// Resume sections
router.post('/:id/sections', validateBody(addSectionSchema), controller.addSection);
router.put('/:id/sections/:sectionId', validateBody(updateSectionSchema), controller.updateSection);
router.delete(
  '/:id/sections/:sectionId',
  validateQuery(z.object({ type: z.enum(['education', 'experience', 'skill', 'project', 'certification', 'language']) })),
  controller.deleteSection
);

module.exports = router;
