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
import { ItemStepType } from '@/types/item-type';
import { FallbackImage } from '../fallback-image';

type Props = {
  item: ItemStepType;
  isDetailLink?: boolean;
};
const ItemCard = ({ item, isDetailLink = false }: Props) => {
  const router = useRouter();
  return (
    <Card className='relative mx-auto w-full max-w-sm pt-0'>
      <div className='relative aspect-video flex items-center justify-center w-full'>
        <FallbackImage
          className='w-10 h-auto'
          src={item.image ?? ''}
          alt={item.name}
          fill={!!!item.image}
          width={item.image ? 20 : undefined}
          height={item.image ? 20 : undefined}
        />
      </div>
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
