import { Router } from 'express';
import { healthRouter } from './health.routes.js';
import { collectionRouter } from '../modules/collection/collection.routes.js';
import { folderRouter } from '../modules/folder/folder.routes.js';
import { requestRouter } from '../modules/request/request.routes.js';

const apiRouter: Router = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/collections', collectionRouter);
apiRouter.use('/collections/:collectionId/folders', folderRouter);
apiRouter.use('/requests', requestRouter);

export { apiRouter };
