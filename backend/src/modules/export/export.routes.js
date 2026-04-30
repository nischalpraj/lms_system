const express = require('express');
const controller = require('./export.controller');
const { authenticate } = require('../../middleware/auth.middleware');

const router = express.Router();

router.use(authenticate);

// GET /resumes/:id/export/pdf  (mounted under /resumes)
router.get('/:id/export/pdf', controller.exportPdf);

module.exports = router;
