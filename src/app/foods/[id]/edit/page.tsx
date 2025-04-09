import { notFound } from 'next/navigation';

import { FoodForm } from '@/components/foods/food-form';
import { getFoodById } from '@/app/actions/food';

interface EditFoodPageProps {
  params: {
    id: string;
  };
}

export const metadata = {
  title: 'Edit Food',
  description: 'Edit an existing food item',
};

export default async function EditFoodPage({ params }: EditFoodPageProps) {
  const food = await getFoodById(params.id);

  if (!food) {
    notFound();
  }

  return (
    <div className='container py-10'>
      <h1 className='text-3xl font-bold mb-8'>Edit Food</h1>
      <FoodForm food={food} />
    </div>
  );
}
