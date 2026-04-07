import { z } from 'zod';

export const createCollectionSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  description: z.string().max(1000).nullable().optional(),
});

export const updateCollectionSchema = z
  .object({
    name: z.string().min(1, 'Name cannot be empty').max(255).optional(),
    description: z.string().max(1000).nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export const collectionIdParamSchema = z.object({
  collectionId: z.string().min(1),
});
