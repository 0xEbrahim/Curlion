import { z } from 'zod';

const keyValueEntrySchema = z.object({
  id: z.string().min(1),
  key: z.string(),
  value: z.string(),
  enabled: z.boolean(),
});

const requestBodySchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('none') }),
  z.object({
    type: z.literal('json'),
    content: z.string(),
  }),
  z.object({
    type: z.literal('text'),
    content: z.string(),
  }),
  z.object({
    type: z.literal('form-urlencoded'),
    entries: z.array(keyValueEntrySchema),
  }),
  z.object({
    type: z.literal('multipart-form-data'),
    entries: z.array(keyValueEntrySchema),
  }),
]);

export const requestIdParamSchema = z.object({
  requestId: z.string().min(1),
});

export const createRequestSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  collectionId: z.string().min(1, 'Collection is required'),
  folderId: z.string().min(1).nullable().optional(),
  method: z
    .enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'])
    .default('GET'),
  url: z.string().max(2048).default(''),
  headers: z.array(keyValueEntrySchema).default([]),
  queryParams: z.array(keyValueEntrySchema).default([]),
  body: requestBodySchema.default({ type: 'none' }),
});

export const updateRequestSchema = z
  .object({
    name: z.string().min(1, 'Name cannot be empty').max(255).optional(),
    collectionId: z.string().min(1).optional(),
    folderId: z.string().min(1).nullable().optional(),
    method: z
      .enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'])
      .optional(),
    url: z.string().max(2048).optional(),
    headers: z.array(keyValueEntrySchema).optional(),
    queryParams: z.array(keyValueEntrySchema).optional(),
    body: requestBodySchema.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });
