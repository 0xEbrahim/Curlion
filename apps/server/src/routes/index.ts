import { Router } from 'express';
import { healthRouter } from './health.routes.js';
import { requestRouter } from '../modules/request/request.routes.js';

const apiRouter: Router = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/requests', requestRouter);

export { apiRouter };
