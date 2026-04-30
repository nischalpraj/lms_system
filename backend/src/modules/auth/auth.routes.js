const express = require('express');
const controller = require('./auth.controller');
const { validateBody } = require('../../middleware/validate.middleware');
const { registerSchema, loginSchema, refreshSchema, logoutSchema } = require('./auth.schema');
const { authLimiter } = require('../../middleware/rateLimiter');

const router = express.Router();

router.post('/register', authLimiter, validateBody(registerSchema), controller.register);
router.post('/login', authLimiter, validateBody(loginSchema), controller.login);
router.post('/refresh', validateBody(refreshSchema), controller.refresh);
router.post('/logout', validateBody(logoutSchema), controller.logout);

module.exports = router;
