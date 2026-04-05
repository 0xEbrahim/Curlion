import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';

import { env } from './config/env.js';
import { apiRouter } from './routes/index.js';
import { notFoundHandler } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app: Application = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.LOG_FORMAT));
app.use(compression());

app.use('/api/v1', apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export { app };
