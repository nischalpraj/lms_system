const express = require('express');
const controller = require('./user.controller');
const { authenticate } = require('../../middleware/auth.middleware');
const { requireAdmin } = require('../../middleware/role.middleware');
const { validateBody, validateQuery } = require('../../middleware/validate.middleware');
const { updateMeSchema, listUsersQuerySchema } = require('./user.schema');

const router = express.Router();

router.use(authenticate);

router.get('/me', controller.getMe);
router.put('/me', validateBody(updateMeSchema), controller.updateMe);

// Admin only
router.get('/', requireAdmin, validateQuery(listUsersQuerySchema), controller.listUsers);

module.exports = router;
