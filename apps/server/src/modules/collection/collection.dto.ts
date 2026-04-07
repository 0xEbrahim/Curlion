import type { z } from 'zod';
import type {
  createCollectionSchema,
  updateCollectionSchema,
} from './collection.schemas.js';

type Clean<T> = { [K in keyof T]: Exclude<T[K], undefined> };

export type CreateCollectionDto = Clean<z.infer<typeof createCollectionSchema>>;
export type UpdateCollectionDto = Clean<z.infer<typeof updateCollectionSchema>>;
