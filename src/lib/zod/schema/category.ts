import { z } from 'zod';

const nameSchema = z
  .string()
  .min(2, {
    message: 'Name must be at least 2 characters.',
  })
  .max(100, {
    message: 'Name must not exceed 100 characters.',
  });

const descriptionSchema = z.string().optional();

// Create schema
export const CategorySchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
});

export type CategorySchemaType = z.infer<typeof CategorySchema>;

export const UpdateCategorySchema = z.object({
  name: nameSchema.optional(),
  description: descriptionSchema,
});

export type UpdateCategorySchemaType = z.infer<typeof UpdateCategorySchema>;
