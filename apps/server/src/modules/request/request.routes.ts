import { Router } from 'express';
import { requestController } from './request.controller.js';
import { asyncHandler } from '../../lib/asyncHandler.js';
import validate from '../../middlewares/validation.middleware.js';
import {
  createRequestSchema,
  requestIdParamSchema,
  updateRequestSchema,
} from './request.schemas.js';

const requestRouter: Router = Router();

requestRouter.post(
  '/',
  validate({ body: createRequestSchema }),
  asyncHandler(requestController.create),
);

requestRouter.get('/', asyncHandler(requestController.list));

requestRouter.get(
  '/:requestId',
  validate({ params: requestIdParamSchema }),
  asyncHandler(requestController.getById),
);

requestRouter.patch(
  '/:requestId',
  validate({ params: requestIdParamSchema, body: updateRequestSchema }),
  asyncHandler(requestController.update),
);

requestRouter.delete(
  '/:requestId',
  validate({ params: requestIdParamSchema }),
  asyncHandler(requestController.remove),
);

export { requestRouter };
