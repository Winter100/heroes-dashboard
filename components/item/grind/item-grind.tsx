'use client';

import { useItemGrindForm } from '@/hooks/item/use-item-grind-form';
import GrindList from './grind-list';
import GrindSubmitBar from './grind-submit-bar';

type ItemGrindProps = {
  itemId: string;
};

const ItemGrind = ({ itemId }: ItemGrindProps) => {
  const { data, selectedIds, isPending, toggleGrind, handleSubmit } =
    useItemGrindForm(itemId);

  return (
    <div className='space-y-4'>
      <header className='space-y-1'>
        <h1 className='text-xl font-semibold'>아이템 연마</h1>
        <p className='text-sm text-muted-foreground'>아이템 ID: {itemId}</p>
      </header>
      <GrindList
        grinds={data}
        selectedIds={selectedIds}
        disabled={isPending}
        onToggle={toggleGrind}
      />
      <GrindSubmitBar
        selectedCount={selectedIds.length}
        isPending={isPending}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ItemGrind;
