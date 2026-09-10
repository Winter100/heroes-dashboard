'use client';

import { revalidateApi } from '@/api/api';
import { ActionButton } from '../common/action-button';
import ActionDialog from '../common/action-dialog';
import { Button } from '../ui/button';

const CharacterRevalidate = () => {
  return (
    <ActionDialog
      trigger={<Button variant='secondary'>갱신</Button>}
      title='캐릭터 관련 갱신'
    >
      <ActionButton
        label='캐릭터 이미지 갱신'
        onRequest={() => revalidateApi.characterImage()}
      />
    </ActionDialog>
  );
};

export default CharacterRevalidate;
