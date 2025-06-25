import React from 'react';
import { getAllFoods } from '@/app/actions/food';

export default async function Home() {
  const foods = await getAllFoods();
  return (
    <main className='container mx-auto py-10 px-4'>
      <h1 className='text-2xl font-bold mb-6'>Home</h1>

      <div className='mx-auto'>
        <div className='p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-4'>Food List</h2>
          <ul>
            {foods.map((food) => (
              <li key={food.id} className='mb-2'>
                {food.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
