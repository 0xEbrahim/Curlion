import type { ErrorRequestHandler } from 'express';
import { AppError } from '../lib/AppError.js';
import { HttpStatus } from '../constants/index.js';
import { env } from '../config/env.js';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const statusCode =
    err instanceof AppError ? err.statusCode : HttpStatus.INTERNAL_SERVER_ERROR;

  const message =
    err instanceof AppError && err.isOperational
      ? err.message
      : 'Internal server error';

  if (env.NODE_ENV === 'development') {
    console.error(err);
  }

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
