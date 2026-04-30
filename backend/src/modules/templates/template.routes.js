const express = require('express');
const controller = require('./template.controller');
const { authenticate } = require('../../middleware/auth.middleware');
const { requireAdmin } = require('../../middleware/role.middleware');
const { validateBody, validateQuery } = require('../../middleware/validate.middleware');
const { createTemplateSchema, updateTemplateSchema, listTemplatesQuerySchema } = require('./template.schema');

const router = express.Router();

// Public: list & get
router.get('/', validateQuery(listTemplatesQuerySchema), controller.listTemplates);
router.get('/:id', controller.getTemplate);

// Admin only: create, update, delete
router.post('/', authenticate, requireAdmin, validateBody(createTemplateSchema), controller.createTemplate);
router.put('/:id', authenticate, requireAdmin, validateBody(updateTemplateSchema), controller.updateTemplate);
router.delete('/:id', authenticate, requireAdmin, controller.deleteTemplate);

module.exports = router;
