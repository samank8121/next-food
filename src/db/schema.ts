import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
})

export const foods = pgTable("foods", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  categoryId: uuid("category_id").references(() => categories.id),
  image_url: varchar("image_url", { length: 255 }),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
})

// Relations
export const categoriesRelations = relations(categories, ({ many }) => ({
  foods: many(foods),
}))

export const foodsRelations = relations(foods, ({ one }) => ({
  category: one(categories, {
    fields: [foods.categoryId],
    references: [categories.id],
  }),
}))

export type Food = typeof foods.$inferSelect
export type NewFood = typeof foods.$inferInsert

export type Category = typeof categories.$inferSelect
export type NewCategory = typeof categories.$inferInsert
