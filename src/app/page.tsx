import React from 'react';
import { getAllFoods } from '@/app/actions/food';
import { FoodCard } from '@/components/foods/food-card';

export default async function Home() {
  const foods = await getAllFoods();
  return (
    <main className='container mx-auto py-10 px-4'>
      <h1 className='text-2xl font-bold mb-6'>Our Menu</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {foods.map((food) => (
          <FoodCard key={food.id} food={food} showEdit={false} showDelete={false} />
        ))}
      </div>
    </main>
  );
}
