import type { z } from 'zod';
import type {
  createFolderSchema,
  updateFolderSchema,
} from './folder.schemas.js';

type Clean<T> = { [K in keyof T]: Exclude<T[K], undefined> };

export type CreateFolderDto = Clean<z.infer<typeof createFolderSchema>>;
export type UpdateFolderDto = Clean<z.infer<typeof updateFolderSchema>>;
