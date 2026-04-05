import type { RequestHandler } from 'express';
import { AppError } from '../lib/AppError.js';
import { HttpStatus } from '../constants/index.js';

export const notFoundHandler: RequestHandler = (_req, _res, next) => {
  next(new AppError('Resource not found', HttpStatus.NOT_FOUND));
};
