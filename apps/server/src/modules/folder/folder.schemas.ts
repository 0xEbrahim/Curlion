import { z } from 'zod';

export const folderCollectionParamSchema = z.object({
  collectionId: z.string().min(1),
});

export const folderParamsSchema = z.object({
  collectionId: z.string().min(1),
  folderId: z.string().min(1),
});

export const createFolderSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  parentId: z.string().min(1).nullable().optional(),
});

export const updateFolderSchema = z
  .object({
    name: z.string().min(1, 'Name cannot be empty').max(255).optional(),
    parentId: z.string().min(1).nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });
