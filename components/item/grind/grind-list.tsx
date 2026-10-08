import { groupGrinds } from '@/lib/item-grind';
import type { GrindGetType } from '@/types/item-type';
import GrindCard from './grind-card';

type GrindListProps = {
  grinds: GrindGetType[];
  selectedIds: number[];
  disabled: boolean;
  onToggle: (grindId: number) => void;
};

const GrindList = ({ grinds, selectedIds, disabled, onToggle }: GrindListProps) => {
  if (grinds.length === 0) {
    return (
      <p className='rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground'>
        등록된 연마 정보가 없습니다.
      </p>
    );
  }

  const groups = groupGrinds(grinds);

  return (
    <div className='space-y-4'>
      {Array.from(groups, ([titleId, group]) => (
        <section key={titleId} className='space-y-3'>
          <h2 className='text-lg font-semibold'>{group.name}</h2>
          {Array.from(group.slotGroups, ([slotKey, slotGroup]) => (
            <section key={slotKey} className='space-y-2'>
              <h3 className='border-l-2 border-primary pl-2 text-sm font-medium'>
                {slotGroup.slots.map((slot) => slot.name).join(' · ') || '슬롯 미지정'}
              </h3>
              <div className='grid items-start gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {slotGroup.grinds.map((grind) => (
                  <GrindCard
                    key={grind.id}
                    grind={grind}
                    selected={selectedIds.includes(grind.id)}
                    disabled={disabled}
                    onToggle={onToggle}
                  />
                ))}
              </div>
            </section>
          ))}
        </section>
      ))}
    </div>
  );
};

export default GrindList;
