import { useAdminUpdateCharacter } from '@/hooks/character/use-admin-character';
import { Button } from '../ui/button';
import CharacterEditForm from './character-edit-form';
import { Character } from '@/types/character-type';
import ConfirmDialog from '../common/confirm-dialog';
import { useState } from 'react';
import { CharacterFormValues } from '@/schema/character.schema';

type Props = {
  classId: string;
  data: Character;
};

const CharacterUpdateDialog = ({ classId, data }: Props) => {
  const [open, setOpen] = useState(false);

  const { isPending, onEdit } = useAdminUpdateCharacter(classId);

  const handleUpdate = (data: CharacterFormValues) => {
    void onEdit(data).then(() => setOpen(false));
  };

  return (
    <ConfirmDialog
      title='직업 정보 수정'
      open={open}
      onOpenChange={setOpen}
      trigger={<Button variant='secondary'>수정</Button>}
      confirmLabel='수정'
      formId={formId}
      disabled={isPending}
    >
      <CharacterEditForm
        formId={formId}
        disabled={isPending}
        defaultValues={data}
        mode='update'
        onSubmit={handleUpdate}
      />
    </ConfirmDialog>
  );
};

export default CharacterUpdateDialog;

const formId = 'update-character';
