const express = require('express');
const controller = require('./ai.controller');
const { authenticate } = require('../../middleware/auth.middleware');
const { validateBody } = require('../../middleware/validate.middleware');
const { z } = require('zod');

const router = express.Router();

const resumeIdSchema = z.object({ resumeId: z.string().min(1) });

router.use(authenticate);

router.post('/summarize', validateBody(resumeIdSchema), controller.summarize);
router.post('/improve-skills', validateBody(resumeIdSchema), controller.improveSkills);
router.post('/score-resume', validateBody(resumeIdSchema), controller.scoreResume);

module.exports = router;
