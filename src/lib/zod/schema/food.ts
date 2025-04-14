import { z } from 'zod';

const nameSchema = z
  .string()
  .min(2, {
    message: 'Name must be at least 2 characters.',
  })
  .max(255, {
    message: 'Name must not exceed 255 characters.',
  });

const descriptionSchema = z.string().optional();
const categoryIdSchema = z.string().optional();
const imageUrlSchema = z
  .string()
  .url({ message: 'Please enter a valid URL' })
  .optional();

export const FoodSchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
  categoryId: categoryIdSchema,
  image_url: imageUrlSchema,
});

export type FoodSchemaType = z.infer<typeof FoodSchema>;

export const UpdateFoodSchema = z.object({
  name: nameSchema.optional(),
  description: descriptionSchema,
  categoryId: categoryIdSchema,
  image_url: imageUrlSchema,
});

export type UpdateFoodSchemaType = z.infer<typeof UpdateFoodSchema>;
