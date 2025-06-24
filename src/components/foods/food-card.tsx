 
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DeleteFoodButton } from './delete-food-button';
import { Edit } from 'lucide-react';

interface FoodCardProps {
  food: {
    id: string;
    name: string;
    description: string | null;
    image_url: string | null;
  };
}

export function FoodCard({ food }: FoodCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const placeholderImage = '/coming-soon.jpg';
  return (
    <Card key={food.id}>
      <CardHeader className='p-0'>
        <div className='relative aspect-video w-full overflow-hidden rounded-t-lg'>
          {imageLoading && !imageError && (
            <div className='absolute inset-0 animate-pulse bg-muted' />
          )}
          {
            <Image
              src={
                imageError
                  ? placeholderImage
                  : food.image_url || placeholderImage
              }
              alt={food.name}
              fill
              className={`object-contain transition-opacity duration-300 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              unoptimized
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
              sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
              priority={false}
            />
          }
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
          <p className='text-sm text-muted-foreground italic'>No description</p>
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
  );
}
