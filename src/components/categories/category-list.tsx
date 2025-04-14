import Link from 'next/link';
import { Edit } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DeleteCategoryButton } from './delete-category-button';
import { getAllCategories } from '@/app/actions/category';

export async function CategoryList() {
  const categories = await getAllCategories();

  if (categories.length === 0) {
    return (
      <div className='text-center py-10'>
        <h3 className='text-lg font-medium mb-2'>No categories found</h3>
        <p className='text-muted-foreground mb-4'>
          Get started by creating your first category.
        </p>
        <Button asChild>
          <Link href='/categories/create'>Create Category</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      {categories.map((category) => (
        <Card key={category.id}>
          <CardHeader>
            <CardTitle className='truncate'>
              <Link
                href={`/categories/${category.id}`}
                className='hover:underline'
              >
                {category.name}
              </Link>
            </CardTitle>
            <CardDescription>
              {new Date(category.created_at).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {category.description ? (
              <p className='line-clamp-3'>{category.description}</p>
            ) : (
              <p className='text-muted-foreground italic'>No description</p>
            )}
          </CardContent>
          <CardFooter className='flex justify-between'>
            <Button variant='outline' size='sm' asChild>
              <Link href={`/categories/${category.id}/edit`}>
                <Edit className='h-4 w-4 mr-2' /> Edit
              </Link>
            </Button>
            <DeleteCategoryButton id={category.id} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
