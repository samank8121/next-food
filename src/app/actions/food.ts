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



// function selectWithout<T extends Record<string, any>>(
//   table: T,
//   exclude: Array<keyof T>
// ) {
//   return Object.fromEntries(
//     Object.entries(table).filter(([key]) => !exclude.includes(key as keyof T))
//   );
// }
// export async function getAllFoods() {
//   const fields = selectWithout(foods, ['created_at', 'updated_at']);
//   return await db
//     .select(fields)
//     .from(foods);  
// }
export async function getAllFoods() {  
  return await db
    .select({
      name: foods.name,
      description: foods.description,
      id: foods.id,
      image_url: foods.image_url,
    })
    .from(foods);
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
