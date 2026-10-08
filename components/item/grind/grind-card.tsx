import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { GrindGetType } from '@/types/item-type';
import { Check, ImageOff } from 'lucide-react';

type GrindCardProps = {
  grind: GrindGetType;
  selected: boolean;
  disabled: boolean;
  onToggle: (grindId: number) => void;
};

const GrindCard = ({ grind, selected, disabled, onToggle }: GrindCardProps) => {
  return (
    <Card
      size='sm'
      className={cn(
        'relative [--card-spacing:--spacing(3)] transition-colors hover:bg-muted/30',
        selected && 'bg-primary/5 ring-2 ring-primary',
      )}
    >
      <button
        type='button'
        disabled={disabled}
        aria-pressed={selected}
        aria-label={`${grind.title.name} ${grind.stat.name} (${grind.id}) 연마 선택`}
        onClick={() => onToggle(grind.id)}
        className='absolute inset-0 z-10 cursor-pointer rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-wait'
      />
      <CardHeader className='gap-2'>
        <div className='flex items-center gap-2'>
          <Avatar size='sm'>
            <AvatarImage
              src={grind.stat.image.trim() || undefined}
              alt={grind.stat.name}
              className='object-contain'
            />
            <AvatarFallback>
              <ImageOff className='size-4' aria-hidden='true' />
            </AvatarFallback>
          </Avatar>
          <h4 className='font-semibold'>{grind.stat.name}</h4>
          {selected && (
            <span className='ml-auto flex items-center gap-1 text-xs font-medium text-primary'>
              <Check className='size-3' aria-hidden='true' />
              선택됨
            </span>
          )}
        </div>
        <dl className='flex flex-wrap gap-x-4 gap-y-1 text-xs'>
          <div className='flex items-center gap-1.5'>
            <dt className='text-muted-foreground'>1회</dt>
            <dd className='font-semibold tabular-nums'>
              {grind.statOneValue.toLocaleString('ko-KR')}
            </dd>
          </div>
          <div className='flex items-center gap-1.5'>
            <dt className='text-muted-foreground'>최대</dt>
            <dd className='font-semibold tabular-nums'>
              {grind.statMaxValue.toLocaleString('ko-KR')}
            </dd>
          </div>
        </dl>
      </CardHeader>
      <CardContent className='space-y-1.5 border-t pt-2'>
        <p className='text-xs font-medium'>필요 재료</p>
        <ul className='space-y-1 text-xs'>
          {grind.grindIngredient.map(({ item, quantity }) => (
            <li
              key={item.id}
              className='flex items-start justify-between gap-2'
            >
              <span className='min-w-0 break-words text-muted-foreground'>
                {item.name}
              </span>
              <span className='shrink-0 font-medium tabular-nums'>
                {quantity.toLocaleString('ko-KR')}
              </span>
            </li>
          ))}
        </ul>
        {grind.grindIngredient.length === 0 && (
          <p className='text-sm text-muted-foreground'>
            등록된 재료가 없습니다.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default GrindCard;
