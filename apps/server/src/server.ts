import { env } from './config/env.js';
import { app } from './app.js';

const server = app.listen(env.PORT, () => {
  console.log(
    `[server] running on port ${env.PORT} in ${env.NODE_ENV} mode`,
  );
});

function shutdown(signal: string) {
  console.log(`[server] ${signal} received — shutting down`);
  server.close(() => {
    console.log('[server] closed');
    process.exit(0);
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

process.on('unhandledRejection', (reason) => {
  console.error('[server] unhandled rejection:', reason);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (error) => {
  console.error('[server] uncaught exception:', error);
  server.close(() => process.exit(1));
});
