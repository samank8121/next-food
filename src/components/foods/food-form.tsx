'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { Category, Food } from '@/db/schema';
import { getAllCategories } from '@/app/actions/category';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { createFood, updateFood } from '@/app/actions/food';
import { FoodSchema, FoodSchemaType } from '@/lib/zod/schema/food';
import FileUploader from '../file-uploader';
import { uploadFilesToR2 } from '@/app/actions/upload';

interface FoodFormProps {
  food?: Food;
}

export function FoodForm({ food }: FoodFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    }

    fetchCategories();
  }, []);

  const form = useForm<FoodSchemaType>({
    resolver: zodResolver(FoodSchema),
    defaultValues: {
      name: food?.name || '',
      description: food?.description || '',
      categoryId: food?.categoryId || undefined,
      image_url: food?.image_url || '',
    },
  });

  async function onSubmit(values: FoodSchemaType) {
    setIsLoading(true);

    try {
      if (food) {
        await updateFood(food.id, {
          ...values,
        });
        toast('Food updated', {
          description: 'Your food item has been updated successfully.',
        });
      } else {
        await createFood(values);
        toast('Food created', {
          description: 'Your new food item has been created successfully.',
        });
      }

      router.push('/foods');
      router.refresh();
    } catch (error) {
      console.error('Error saving food:', error);
      toast('Something went wrong', {
        description: 'Your food item could not be saved. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const imageUrl = form.watch('image_url');

  return (
    <Card className='max-w-2xl mx-auto p-6'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter food name' {...field} />
                </FormControl>
                <FormDescription>The name of your food item.</FormDescription>
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
                    placeholder='Enter food description (optional)'
                    className='resize-none'
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormDescription>
                  A brief description of this food item.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='categoryId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a category (optional)' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='none'>None</SelectItem>
                    <Suspense fallback={<p>waiting for message...</p>}>
                      {categories.map((category: Category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </Suspense>
                  </SelectContent>
                </Select>
                <FormDescription>
                  The category this food item belongs to.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='image_url'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <FileUploader
                    multiple={false}
                    maxSize={10}
                    acceptedTypes={['*/*']}
                    onUpload={uploadFilesToR2}
                    onSuccess={(urls) => {
                      setIsLoadingUpload(false); // Reset upload loading state after success
                      field.onChange(urls[0]);
                      toast('Image uploaded', {
                        description:
                          'Your image has been uploaded successfully.',
                      });
                    }}
                    onStart={() => setIsLoadingUpload(true)} // Set loading state when upload starts
                    showUploadButton={false}
                  />
                </FormControl>
                <FormDescription>
                  A URL to an image of this food item.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {imageUrl && (
            <div className='border rounded-md p-2'>
              <p className='text-sm font-medium mb-2'>Image Preview</p>
              <div className='relative aspect-video w-full overflow-hidden rounded-md'>
                <Image
                  src={imageUrl || '/placeholder.svg'}
                  alt='Preview'
                  fill
                  className='object-cover'
                  onError={(e) => {
                    e.currentTarget.src =
                      '/placeholder.svg?height=300&width=500';
                  }}
                />
              </div>
            </div>
          )}

          <div className='flex justify-end gap-4'>
            <Button
              type='button'
              variant='outline'
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={isLoading || isLoadingUpload}>
              {isLoading ? 'Saving...' : food ? 'Update Food' : 'Create Food'}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
