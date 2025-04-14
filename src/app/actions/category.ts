'use server';

import { db } from '@/db';
import { categories } from '@/db/schema';
import errorProducer from '@/lib/error-producer';
import {
  CategorySchema,
  CategorySchemaType,
  UpdateCategorySchemaType,
} from '@/lib/zod/schema/category';
import { eq } from 'drizzle-orm';

export async function getAllCategories() {
  return await db.query.categories.findMany();
}

export async function getCategoryById(id: string) {
  return await db.query.categories.findFirst({
    where: eq(categories.id, id),
    with: {
      foods: true,
    },
  });
}

export async function createCategory(category: CategorySchemaType) {
  try {
    const { name, description } = CategorySchema.parse(category);
    const newCategory = await db
      .insert(categories)
      .values({ name, description })
      .returning();
    return newCategory;
  } catch (error) {
    return errorProducer(error, 'Failed to create category.');
  }
}

export async function updateCategory(
  id: string,
  category: UpdateCategorySchemaType
) {
  try {
    CategorySchema.parse(category);
    return await db
      .update(categories)
      .set({ ...category, updated_at: new Date() })
      .where(eq(categories.id, id))
      .returning();
  } catch (error) {
    return errorProducer(error, 'Failed to update category.');
  }
}

export async function deleteCategory(id: string) {
  return await db.delete(categories).where(eq(categories.id, id)).returning();
}
