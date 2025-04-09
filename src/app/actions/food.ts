"use server"
import { db } from "@/db"
import { foods, Food, NewFood } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getAllFoods() {
  return await db.query.foods.findMany({
    with: {
      category: true,
    },
  })
}

export async function getFoodById(id: string) {
  return await db.query.foods.findFirst({
    where: eq(foods.id, id),
    with: {
      category: true,
    },
  })
}

export async function createFood(food: NewFood) {
  return await db.insert(foods).values(food).returning()
}

export async function updateFood(id: string, food: Food) {
  return await db
    .update(foods)
    .set({ ...food, updated_at: new Date() })
    .where(eq(foods.id, id))
    .returning()
}

export async function deleteFood(id: string) {
  return await db.delete(foods).where(eq(foods.id, id)).returning()
}

