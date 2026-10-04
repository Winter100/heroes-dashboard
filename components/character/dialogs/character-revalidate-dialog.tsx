'use client';

import { revalidateTags } from '@/constant/constant';
import ActionDialog from '../../common/action-dialog';
import { Button } from '../../ui/button';
import DetailRevalidateButton from '@/components/common/detail-revalidate-button';

const CharacterRevalidateDialog = () => {
  return (
    <ActionDialog
      trigger={<Button variant='secondary'>갱신</Button>}
      title='캐릭터 관련 갱신'
    >
      <DetailRevalidateButton
        resourceName='캐릭터 이미지 갱신'
        tag={revalidateTags.characterImage}
      />
    </ActionDialog>
  );
};

export default CharacterRevalidateDialog;
