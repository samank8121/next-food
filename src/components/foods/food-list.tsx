import { getAllFoods } from '@/app/actions/food';
import Link from 'next/link';
import Image from 'next/image';
import { Edit } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DeleteFoodButton } from './delete-food-button';

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
      {foods.map((food) => (
        <Card key={food.id}>
          <CardHeader className='p-0'>
            <div className='relative aspect-video w-full overflow-hidden rounded-t-lg'>
              <Image
                src={food.image_url || '/placeholder.svg?height=300&width=500'}
                alt={food.name}
                fill
                className='object-cover'
              />
            </div>
          </CardHeader>
          <CardContent className='pt-4'>
            <CardTitle className='truncate mb-2'>
              <Link href={`/foods/${food.id}`} className='hover:underline'>
                {food.name}
              </Link>
            </CardTitle>
            {food.description ? (
              <p className='line-clamp-2 text-sm text-muted-foreground'>
                {food.description}
              </p>
            ) : (
              <p className='text-sm text-muted-foreground italic'>
                No description
              </p>
            )}
          </CardContent>
          <CardFooter className='flex justify-between'>
            <Button variant='outline' size='sm' asChild>
              <Link href={`/foods/${food.id}/edit`}>
                <Edit className='h-4 w-4 mr-2' /> Edit
              </Link>
            </Button>
            <DeleteFoodButton id={food.id} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
