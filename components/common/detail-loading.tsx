import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

const DetailLoading = () => {
  return (
    <div className='space-y-2'>
      <Card className='w-full max-w-sm mx-auto'>
        <CardContent>
          <Skeleton className='h-72 w-full' />
        </CardContent>
      </Card>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-2 w-full'>
        {Array.from({ length: 10 }).map((_, i) => (
          <Card key={i} className='w-full max-w-sm'>
            <CardContent>
              <Skeleton className='h-96 w-full' />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DetailLoading;
