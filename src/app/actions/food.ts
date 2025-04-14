'use server';
import { db } from '@/db';
import { foods } from '@/db/schema';
import errorProducer from '@/lib/error-producer';
import {
  FoodSchema,
  FoodSchemaType,
  UpdateFoodSchemaType,
} from '@/lib/zod/schema/food';
import { eq } from 'drizzle-orm';

export async function getAllFoods() {
  return await db.query.foods.findMany({
    with: {
      category: true,
    },
  });
}

export async function getFoodById(id: string) {
  return await db.query.foods.findFirst({
    where: eq(foods.id, id),
    with: {
      category: true,
    },
  });
}

export async function createFood(food: FoodSchemaType) {
  try {
    FoodSchema.parse(food);
    return await db.insert(foods).values(food).returning();
  } catch (error) {
    return errorProducer(error, 'Failed to create food.');
  }
}

export async function updateFood(id: string, food: UpdateFoodSchemaType) {
  try {
    FoodSchema.parse(food);
    return await db
      .update(foods)
      .set({ ...food, updated_at: new Date() })
      .where(eq(foods.id, id))
      .returning();
  } catch (error) {
    return errorProducer(error, 'Failed to update food.');
  }
}

export async function deleteFood(id: string) {
  try {
    return await db.delete(foods).where(eq(foods.id, id)).returning();
  } catch (error) {
    return errorProducer(error, 'Failed to delete food.');
  }
}
