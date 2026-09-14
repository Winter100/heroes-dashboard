'use client';
import { Button } from '../ui/button';
import CharacterEditForm from './character-edit-form';
import { useAdminCreateCharacter } from '@/hooks/character/use-admin-character';
import ActionDialog from '../common/action-dialog';
import { useState } from 'react';
import { CharacterFormValues } from '@/schema/character.schema';

const CharacterCreate = () => {
  const [createOpen, setCreateOpen] = useState(false);

  const { onCreate, isPending: createCharacterPending } =
    useAdminCreateCharacter();

  const handleCreate = (data: CharacterFormValues) => {
    void onCreate(data).then(() => setCreateOpen(false));
  };

  return (
    <ActionDialog
      title='직업 생성'
      open={createOpen}
      setOpen={setCreateOpen}
      trigger={<Button variant='secondary'>직업 생성</Button>}
    >
      <CharacterEditForm
        mode='create'
        mutate={handleCreate}
        disabled={createCharacterPending}
      />
    </ActionDialog>
  );
};

export default CharacterCreate;
