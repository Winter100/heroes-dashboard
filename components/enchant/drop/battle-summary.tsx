import { FallbackImage } from '@/components/fallback-image';
import type { RaidType } from '@/types/raid-type';
import { Swords } from 'lucide-react';

const BattleSummary = ({
  raid,
}: {
  raid: Pick<RaidType, 'id' | 'battle' | 'boss' | 'image'>;
}) => (
  <div className='flex min-w-0 items-center gap-3'>
    <div className='relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-background/60'>
      {raid.image ? (
        <FallbackImage
          className='size-8 object-contain'
          src={raid.image}
          alt={raid.boss}
          width={32}
          height={32}
        />
      ) : (
        <Swords aria-hidden='true' className='size-5 text-muted-foreground' />
      )}
    </div>
    <div className='min-w-0'>
      <p className='text-sm font-medium'>{raid.battle}</p>
      <p className='mt-1 text-xs text-muted-foreground'>{raid.boss}</p>
    </div>
  </div>
);

export default BattleSummary;
