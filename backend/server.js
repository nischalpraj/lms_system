require('dotenv').config();
const app = require('./src/app');
const env = require('./src/config/env');
const prisma = require('./src/config/db');

const PORT = parseInt(env.PORT, 10);

const server = app.listen(PORT, () => {
  console.log(`🚀 Resume API running on http://localhost:${PORT}`);
  console.log(`📦 Environment: ${env.NODE_ENV}`);
});

// ── Graceful shutdown ────────────────────────────────────
const shutdown = async (signal) => {
  console.log(`\n⚠️  Received ${signal}. Shutting down gracefully...`);

  server.close(async () => {
    console.log('🔒 HTTP server closed');
    await prisma.$disconnect();
    console.log('🔌 Database disconnected');
    process.exit(0);
  });

  // Force exit if shutdown takes too long
  setTimeout(() => {
    console.error('❌ Forced shutdown after timeout');
    process.exit(1);
  }, 10_000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Promise Rejection:', reason);
  shutdown('unhandledRejection');
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  shutdown('uncaughtException');
});
