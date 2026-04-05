import { z } from "zod";

export const createCollectionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

export const updateCollectionSchema = createCollectionSchema.partial();
