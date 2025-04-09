import { FoodForm } from "@/components/foods/food-form"

export const metadata = {
  title: "Create Food",
  description: "Create a new food item",
}

export default function NewFoodPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Create Food</h1>
      <FoodForm />
    </div>
  )
}
