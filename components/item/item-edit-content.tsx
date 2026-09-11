'use client';

import { useNeedItemBasicId } from '@/hooks/item/use-item';
import { ItemStepType } from '@/types/item-type';
import ItemEditForm from './item-edit-form';
import { ItemFormValues } from '@/schema/item.schema';
type Props = {
  data?: ItemStepType;
  isPending: boolean;
  mutate: (data: ItemFormValues) => void;
  mode: 'create' | 'update';
};

const ItemEditContent = ({ data, isPending, mode, mutate }: Props) => {
  /* 폼 생성, 수정시 필요한 스텟, 카테고리, 등급 ID를 서버에서 가져옴 */
  const basicId = useNeedItemBasicId();

  return (
    <ItemEditForm
      basicId={basicId.data}
      defaultValues={data}
      mode={mode}
      mutate={mutate}
      disabled={isPending}
    />
  );
};

export default ItemEditContent;
