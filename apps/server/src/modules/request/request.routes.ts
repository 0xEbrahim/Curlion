import { Router } from 'express';
import { requestController } from './request.controller.js';
import { asyncHandler } from '../../lib/asyncHandler.js';

const requestRouter: Router = Router();

requestRouter.get('/', asyncHandler(requestController.getAll));

export { requestRouter };
