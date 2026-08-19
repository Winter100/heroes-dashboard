import { Card, CardContent } from './ui/card';
import { Skeleton } from './ui/skeleton';

const LoadingSkeleton = () => {
  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-2 w-full'>
      {Array.from({ length: 20 }).map((_, i) => (
        <Card key={i} className='w-full max-w-sm'>
          <CardContent>
            <Skeleton className='h-72 w-full' />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
