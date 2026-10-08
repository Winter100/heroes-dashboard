'use client';

import { revalidateTags } from '@/constant/constant';
import ActionDialog from '../../common/action-dialog';
import { Button } from '../../ui/button';
import DetailRevalidateButton from '@/components/common/detail-revalidate-button';

const ItemRevalidateDialog = () => {
  return (
    <ActionDialog
      trigger={<Button variant='secondary'>갱신</Button>}
      title='아이템 갱신'
    >
      <DetailRevalidateButton
        resourceName='아이템 SSG 갱신'
        tag={revalidateTags.recipeSSG}
      />
      <DetailRevalidateButton
        resourceName='아이템 레시피 갱신'
        tag={revalidateTags.recipes}
      />
      <DetailRevalidateButton
        resourceName='아이템 세트 옵션 갱신'
        tag={revalidateTags.itemSetOption}
      />
      <DetailRevalidateButton
        resourceName='아이템 연마 갱신'
        tag={revalidateTags.grind}
      />
    </ActionDialog>
  );
};

export default ItemRevalidateDialog;
