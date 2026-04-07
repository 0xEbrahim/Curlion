import type { z } from 'zod';
import type {
  createRequestSchema,
  updateRequestSchema,
} from './request.schemas.js';

type Clean<T> = { [K in keyof T]: Exclude<T[K], undefined> };

export type CreateRequestDto = Clean<z.infer<typeof createRequestSchema>>;
export type UpdateRequestDto = Clean<z.infer<typeof updateRequestSchema>>;
