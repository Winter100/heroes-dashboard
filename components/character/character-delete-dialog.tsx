import { useAdminDeleteCharacter } from '@/hooks/character/use-admin-character';
import ConfirmDialog from '../common/confirm-dialog';
import { Button } from '../ui/button';
import { useState } from 'react';

type Props = {
  classId: string;
  name: string;
};

const CharacterDeleteDialog = ({ classId, name }: Props) => {
  const [open, setOpen] = useState(false);
  const { isPending: deleteCharacterPending, onDelete } =
    useAdminDeleteCharacter(classId);

  const handleDelete = () => {
    void onDelete(name).then(() => setOpen(false));
  };

  return (
    <ConfirmDialog
      title={name}
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button variant='destructive' disabled={deleteCharacterPending}>
          삭제
        </Button>
      }
      description='해당 직업을 삭제 하겠습니까?'
      pending={deleteCharacterPending}
      onConfirm={handleDelete}
      confirmLabel='네'
    />
  );
};

export default CharacterDeleteDialog;
