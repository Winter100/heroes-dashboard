import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { RaidType } from '@/types/raid-type';
import { FallbackImage } from '../fallback-image';

type Props = {
  raid: RaidType;
  isDetailLink?: boolean;
};
const RaidCard = ({ raid, isDetailLink = false }: Props) => {
  const router = useRouter();
  return (
    <Card className='mx-auto w-full max-w-sm overflow-hidden pt-0'>
      <div className='relative aspect-video flex items-center justify-center w-full'>
        <FallbackImage
          className='w-20 h-auto'
          src={raid.image ?? ''}
          alt={raid.boss}
          fill={!!!raid.image}
          width={raid.image ? 70 : undefined}
          height={raid.image ? 70 : undefined}
        />
      </div>
      <CardHeader>
        <CardAction />
        <CardTitle className='mb-1'>{raid.battle}</CardTitle>

        <CardDescription>
          <div className='flex flex-col gap-0.5'>
            <div className='flex items-center gap-2'>
              <div className='w-20'>레이드</div>
              <div>{raid.raidTitle.name}</div>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-20'>보스</div>
              <div>{raid.boss}</div>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-20'>빠른전투</div>
              <div>{raid?.entry?.length}</div>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-20'>상한</div>
              <div>{raid?.limit?.length}</div>
            </div>
          </div>
        </CardDescription>
      </CardHeader>

      {isDetailLink && (
        <CardFooter>
          <Button
            className='w-full'
            onClick={() => router.push(`/dashboard/raid/${raid.id}`)}
          >
            자세히
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default RaidCard;
