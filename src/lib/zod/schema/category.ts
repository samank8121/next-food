import { z } from 'zod';

export const CategorySchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(100, {
      message: 'Name must not exceed 100 characters.',
    }),
  description: z.string().optional(),
});

export type CategorySchemaType = z.infer<
  typeof CategorySchema
>;