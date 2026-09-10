'use client';
import { Button } from '../ui/button';
import CharacterEditForm from './character-edit-form';
import { useAdminCreateCharacter } from '@/hooks/character/use-admin-character';
import ActionDialog from '../common/action-dialog';

const CharacterCreate = () => {
  const { onCreate, createOpen, setCreateOpen } = useAdminCreateCharacter();

  return (
    <ActionDialog
      title='직업 생성'
      open={createOpen}
      setOpen={setCreateOpen}
      trigger={<Button variant='secondary'>직업 생성</Button>}
    >
      <CharacterEditForm mode='create' mutate={onCreate} />
    </ActionDialog>
  );
};

export default CharacterCreate;
