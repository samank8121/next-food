import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Edit, ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DeleteCategoryButton } from '@/components/categories/delete-category-button';
//import { FoodList } from "@/components/foods/food-list"
import { getCategoryById } from '@/app/actions/category';

interface CategoryDetailPageProps {
   params: Promise<{ id: string }>
}

export default async function CategoryDetailPage({
  params,
}: CategoryDetailPageProps) {
  const { id } = await params;
  if (!id || isNaN(Number(id))) {
    notFound();
  }
  const category = await getCategoryById(id);

  if (!category) {
    notFound();
  }

  return (
    <div className='container py-10'>
      <div className='flex items-center mb-8'>
        <Button variant='outline' size='sm' asChild className='mr-4'>
          <Link href='/categories'>
            <ArrowLeft className='mr-2 h-4 w-4' /> Back to Categories
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>{category.name}</h1>
      </div>

      <Card className='mb-8'>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
          <CardDescription>Information about this category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4'>
            <div>
              <h3 className='font-medium'>Name</h3>
              <p>{category.name}</p>
            </div>
            {category.description && (
              <div>
                <h3 className='font-medium'>Description</h3>
                <p>{category.description}</p>
              </div>
            )}
            <div>
              <h3 className='font-medium'>Created At</h3>
              <p>{new Date(category.created_at).toLocaleString()}</p>
            </div>
            <div>
              <h3 className='font-medium'>Updated At</h3>
              <p>{new Date(category.updated_at).toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button variant='outline' asChild>
            <Link href={`/categories/${category.id}/edit`}>
              <Edit className='mr-2 h-4 w-4' /> Edit
            </Link>
          </Button>
          <DeleteCategoryButton id={category.id} />
        </CardFooter>
      </Card>
    </div>
  );
}
