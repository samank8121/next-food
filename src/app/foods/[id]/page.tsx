import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
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
import { getFoodById } from '@/app/actions/food';
import { DeleteFoodButton } from '@/components/foods/delete-food-button';

interface FoodDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function FoodDetailPage({ params }: FoodDetailPageProps) {
  const { id } = await params;
  if (!id || isNaN(Number(id))) {
    notFound();
  }
  const food = await getFoodById(id);

  if (!food) {
    notFound();
  }

  return (
    <div className='container py-10'>
      <div className='flex items-center mb-8'>
        <Button variant='outline' size='sm' asChild className='mr-4'>
          <Link href='/foods'>
            <ArrowLeft className='mr-2 h-4 w-4' /> Back to Foods
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>{food.name}</h1>
      </div>

      <div className='grid md:grid-cols-2 gap-8'>
        {food.image_url && (
          <div className='aspect-square relative rounded-lg overflow-hidden border'>
            <Image
              src={food.image_url || '/placeholder.svg'}
              alt={food.name}
              fill
              className='object-cover'
            />
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Food Details</CardTitle>
            <CardDescription>Information about this food item</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-4'>
              <div>
                <h3 className='font-medium'>Name</h3>
                <p>{food.name}</p>
              </div>
              {food.description && (
                <div>
                  <h3 className='font-medium'>Description</h3>
                  <p>{food.description}</p>
                </div>
              )}
              <div>
                <h3 className='font-medium'>Category</h3>
                {food.category ? (
                  <Link
                    href={`/categories/${food.category.id}`}
                    className='text-primary hover:underline'
                  >
                    {food.category.name}
                  </Link>
                ) : (
                  <p className='text-muted-foreground'>No category assigned</p>
                )}
              </div>
              <div>
                <h3 className='font-medium'>Created At</h3>
                <p>{new Date(food.created_at).toLocaleString()}</p>
              </div>
              <div>
                <h3 className='font-medium'>Updated At</h3>
                <p>{new Date(food.updated_at).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className='flex justify-between'>
            <Button variant='outline' asChild>
              <Link href={`/foods/${food.id}/edit`}>
                <Edit className='mr-2 h-4 w-4' /> Edit
              </Link>
            </Button>
            <DeleteFoodButton id={food.id} />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
