import { Button } from '@/components/ui/button';
import { formatDate, getDaysSince } from '@/lib/utils';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { ItemStepType } from '@/types/item-type';

type Props = {
  item: ItemStepType;
  isDetailLink?: boolean;
};
const ItemCard = ({ item, isDetailLink = false }: Props) => {
  const router = useRouter();
  return (
    <Card key={item.id} className='relative mx-auto w-full max-w-sm pt-0'>
      <div className='absolute inset-0 z-30 aspect-video bg-black/35' />
      <img
        src='https://avatar.vercel.sh/shadcn1'
        alt='Event cover'
        className='relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40'
      />
      <CardHeader>
        <CardAction></CardAction>
        <CardTitle className='mb-1'>{item.name}</CardTitle>
        <CardDescription>
          <div className='flex flex-col gap-0.5'>
            <div className='flex items-center gap-2'>
              <div className='w-24'>카테고리</div>
              <div>{item.category.name}</div>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-24'>등급</div>
              <div>{item.tier.name}</div>
            </div>
            {item?.description && (
              <div className='mt-2 whitespace-pre-line'>{item.description}</div>
            )}
          </div>
        </CardDescription>
      </CardHeader>
      {isDetailLink && (
        <CardFooter>
          <Button
            className='w-full'
            onClick={() => router.push(`item/${item.id}`)}
          >
            자세히
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ItemCard;
