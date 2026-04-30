const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const env = require('./config/env');
const { generalLimiter } = require('./middleware/rateLimiter');
const { errorHandler } = require('./middleware/error.middleware');

const authRoutes = require('./modules/auth/auth.routes');
const userRoutes = require('./modules/users/user.routes');
const resumeRoutes = require('./modules/resumes/resume.routes');
const templateRoutes = require('./modules/templates/template.routes');
const aiRoutes = require('./modules/ai/ai.routes');
const exportRoutes = require('./modules/export/export.routes');

const app = express();

// ── Security ──────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ── Parsing ───────────────────────────────────────────────
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Logging ───────────────────────────────────────────────
if (env.NODE_ENV !== 'test') {
  app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// ── Rate limiting ─────────────────────────────────────────
app.use(generalLimiter);

// ── Health check ──────────────────────────────────────────
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, status: 'ok', timestamp: new Date().toISOString() });
});

// ── Routes ────────────────────────────────────────────────
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/resumes', resumeRoutes);
app.use('/resumes', exportRoutes); // export routes share /resumes prefix
app.use('/templates', templateRoutes);
app.use('/ai', aiRoutes);

// ── 404 handler ───────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.originalUrl} not found`,
    code: 404,
  });
});

// ── Global error handler ──────────────────────────────────
app.use(errorHandler);

module.exports = app;
