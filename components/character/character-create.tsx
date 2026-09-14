'use client';
import { Button } from '../ui/button';
import CharacterEditForm from './character-edit-form';
import { useAdminCreateCharacter } from '@/hooks/character/use-admin-character';
import { useState } from 'react';
import { CharacterFormValues } from '@/schema/character.schema';
import ConfirmDialog from '../common/confirm-dialog';

const CharacterCreate = () => {
  const [open, setOpen] = useState(false);

  const { onCreate, isPending } = useAdminCreateCharacter();

  const handleCreate = (data: CharacterFormValues) => {
    void onCreate(data).then(() => setOpen(false));
  };

  return (
    <ConfirmDialog
      title='직업 생성'
      open={open}
      onOpenChange={setOpen}
      trigger={<Button variant='secondary'>직업 생성</Button>}
      formId={formId}
      disabled={isPending}
      confirmLabel='생성'
    >
      <CharacterEditForm
        formId={formId}
        mode='create'
        onSubmit={handleCreate}
        disabled={isPending}
      />
    </ConfirmDialog>
  );
};

export default CharacterCreate;

const formId = 'create-character';
