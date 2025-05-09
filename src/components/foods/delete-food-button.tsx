'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { deleteFood } from '@/app/actions/food';
import { toast } from 'sonner';

interface DeleteFoodButtonProps {
  id: string;
}

export function DeleteFoodButton({ id }: DeleteFoodButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    setIsLoading(true);

    try {
      await deleteFood(id);
      toast('Food deleted', {
        description: 'The food item has been deleted successfully.',
      });
      router.push('/foods');
      router.refresh();
    } catch (error) {
      console.error('Error deleting food:', error);
      toast('Something went wrong', {
        description: 'The food item could not be deleted. Please try again.',
      });
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant='outline' size='sm' className='text-destructive'>
          <Trash2 className='h-4 w-4 mr-2' /> Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the food
            item and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className='bg-destructive/70 text-destructive-foreground hover:bg-destructive/40'
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
