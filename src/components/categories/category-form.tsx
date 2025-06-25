'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { Category } from '@/db/schema';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { createCategory, updateCategory } from '@/app/actions/category';
import { toast } from 'sonner';
import { CategorySchema, CategorySchemaType } from '@/lib/zod/schema/category';

interface CategoryFormProps {
  category?: Category;
}

export function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CategorySchemaType>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: category?.name || '',
      description: category?.description || '',
    },
  });

  async function onSubmit(values: CategorySchemaType) {
    setIsLoading(true);

    try {
      if (category) {
        await updateCategory(category.id, {
          ...values,
        });
        toast('Category updated', {
          description: 'Your category has been updated successfully.',
        });
      } else {
        await createCategory(values);
        toast('Category created', {
          description: 'Your new category has been created successfully.',
        });
      }

      router.push('/categories');
      router.refresh();
    } catch (error) {
      console.error('Error saving category:', error);
      toast('Something went wrong', {
        description: 'Your category could not be saved. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className='p-6'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter category name' {...field} />
                </FormControl>
                <FormDescription>
                  The name of your food category.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Enter category description (optional)'
                    className='resize-none'
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormDescription>
                  A brief description of this category.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex justify-end gap-4'>
            <Button
              type='button'
              variant='outline'
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={isLoading}>
              {isLoading
                ? 'Saving...'
                : category
                ? 'Update Category'
                : 'Create Category'}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
