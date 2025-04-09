import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

export function ListSkeleton() {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className='h-6 w-3/4' />
            <Skeleton className='h-4 w-1/2 mt-2' />
          </CardHeader>
          <CardContent>
            <Skeleton className='h-4 w-full mb-2' />
            <Skeleton className='h-4 w-full mb-2' />
            <Skeleton className='h-4 w-2/3' />
          </CardContent>
          <CardFooter className='flex justify-between'>
            <Skeleton className='h-9 w-20' />
            <Skeleton className='h-9 w-20' />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
