import { getAllFoods } from '@/app/actions/food';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { FoodCard } from './food-card';

export async function FoodList() {
  const foods = await getAllFoods();
  if (foods.length === 0) {
    return (
      <div className='text-center py-10'>
        <h3 className='text-lg font-medium mb-2'>No foods found</h3>
        <p className='text-muted-foreground mb-4'>
          Get started by creating your first food item.
        </p>
        <Button asChild>
          <Link href='/foods/create'>Create Food</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      {foods.map((food) => {
        return <FoodCard key={food.id} food={food} />;
      })}
    </div>
  );
}
