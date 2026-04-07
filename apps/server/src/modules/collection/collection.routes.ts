import { Router } from 'express';
import { collectionController } from './collection.controller.js';
import { asyncHandler } from '../../lib/asyncHandler.js';
import validate from '../../middlewares/validation.middleware.js';
import {
  createCollectionSchema,
  updateCollectionSchema,
  collectionIdParamSchema,
} from './collection.schemas.js';

const collectionRouter: Router = Router();

collectionRouter.post(
  '/',
  validate({ body: createCollectionSchema }),
  asyncHandler(collectionController.create),
);

collectionRouter.get('/', asyncHandler(collectionController.list));

collectionRouter.get(
  '/:collectionId',
  validate({ params: collectionIdParamSchema }),
  asyncHandler(collectionController.getById),
);

collectionRouter.patch(
  '/:collectionId',
  validate({ params: collectionIdParamSchema, body: updateCollectionSchema }),
  asyncHandler(collectionController.update),
);

collectionRouter.delete(
  '/:collectionId',
  validate({ params: collectionIdParamSchema }),
  asyncHandler(collectionController.remove),
);

export { collectionRouter };
