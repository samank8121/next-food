"use server"

import { db } from "@/db"
import { categories, Category, NewCategory } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getAllCategories() {
    return await db.query.categories.findMany()
  }
  
  export async function getCategoryById(id: string) {
    return await db.query.categories.findFirst({
      where: eq(categories.id, id),
      with: {
        foods: true,
      },
    })
  }
  
  export async function createCategory(category: NewCategory) {
    return await db.insert(categories).values(category).returning()
  }
  
  export async function updateCategory(id: string, category: Category) {
    return await db
      .update(categories)
      .set({ ...category, updated_at: new Date() })
      .where(eq(categories.id, id))
      .returning()
  }
  
  export async function deleteCategory(id: string) {
    return await db.delete(categories).where(eq(categories.id, id)).returning()
  }
  