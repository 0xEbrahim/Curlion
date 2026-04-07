import type { z } from 'zod';
import type {
  createCollectionSchema,
  updateCollectionSchema,
} from './collection.schemas.js';

export type CreateCollectionDto = z.infer<typeof createCollectionSchema>;
export type UpdateCollectionDto = z.infer<typeof updateCollectionSchema>;
