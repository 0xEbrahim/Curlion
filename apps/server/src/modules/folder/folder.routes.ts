import { Router } from 'express';
import { folderController } from './folder.controller.js';
import { asyncHandler } from '../../lib/asyncHandler.js';
import validate from '../../middlewares/validation.middleware.js';
import {
  createFolderSchema,
  updateFolderSchema,
  folderParamsSchema,
  folderCollectionParamSchema,
} from './folder.schemas.js';

const folderRouter: Router = Router({ mergeParams: true });

folderRouter.post(
  '/',
  validate({ params: folderCollectionParamSchema, body: createFolderSchema }),
  asyncHandler(folderController.create),
);

folderRouter.get(
  '/',
  validate({ params: folderCollectionParamSchema }),
  asyncHandler(folderController.list),
);

folderRouter.get(
  '/:folderId',
  validate({ params: folderParamsSchema }),
  asyncHandler(folderController.getById),
);

folderRouter.patch(
  '/:folderId',
  validate({ params: folderParamsSchema, body: updateFolderSchema }),
  asyncHandler(folderController.update),
);

folderRouter.delete(
  '/:folderId',
  validate({ params: folderParamsSchema }),
  asyncHandler(folderController.remove),
);

export { folderRouter };
