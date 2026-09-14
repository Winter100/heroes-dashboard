import { useAdminUpdateCharacter } from '@/hooks/character/use-admin-character';
import ActionDialog from '../common/action-dialog';
import { Button } from '../ui/button';
import CharacterEditForm from './character-edit-form';
import { Character } from '@/types/character-type';

type Props = {
  classId: string;
  data: Character;
};

const CharacterUpdateDialog = ({ classId, data }: Props) => {
  const {
    isPending: updateCharacterPending,
    onEdit,
    editOpen,
    setEditOpen,
  } = useAdminUpdateCharacter(classId);

  return (
    <ActionDialog
      title='직업 정보 수정'
      open={editOpen}
      setOpen={setEditOpen}
      trigger={<Button variant='secondary'>수정</Button>}
    >
      <CharacterEditForm
        disabled={updateCharacterPending}
        defaultValues={data}
        mode='update'
        mutate={onEdit}
      />
    </ActionDialog>
  );
};

export default CharacterUpdateDialog;
