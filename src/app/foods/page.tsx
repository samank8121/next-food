import { Suspense } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { FoodList } from '@/components/foods/food-list';
import { ListSkeleton } from '@/components/list-skeleton';

export const metadata = {
  title: 'Foods',
  description: 'Manage your food items',
};

export default function FoodsPage() {
  return (
    <div className='container py-10'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold'>Foods</h1>
        <Button asChild>
          <Link href='/foods/create'>
            <Plus className='mr-2 h-4 w-4' /> New Food
          </Link>
        </Button>
      </div>

      <Suspense fallback={<ListSkeleton />}>
        <FoodList />
      </Suspense>
    </div>
  );
}
