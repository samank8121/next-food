import { z } from 'zod';

export const FoodSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(255, {
      message: 'Name must not exceed 255 characters.',
    }),
  description: z.string().optional(),
  categoryId: z.string().optional(),
  image_url: z.string().url({ message: 'Please enter a valid URL' }).optional(),
});

export type FoodSchemaType = z.infer<typeof FoodSchema>;
