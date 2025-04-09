import { Suspense } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CategoryList } from '@/components/categories/category-list';
import { CategoryListSkeleton } from '@/components/categories/category-list-skeleton';

export const metadata = {
  title: 'Categories',
  description: 'Manage your food categories',
};

export default function CategoriesPage() {
  return (
    <div className='container py-10'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold'>Categories</h1>
        <Button asChild>
          <Link href='/categories/create'>
            <Plus className='mr-2 h-4 w-4' /> New Category
          </Link>
        </Button>
      </div>

      <Suspense fallback={<CategoryListSkeleton />}>
        <CategoryList />
      </Suspense>
    </div>
  );
}
