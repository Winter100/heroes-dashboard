'use client';

import { useAdminDeleteSkill } from '@/hooks/character/use-admin-character';
import ConfirmDialog from '../common/confirm-dialog';
import { Button } from '../ui/button';
import { useState } from 'react';
type Props = {
  classId: string;
  skillId: string;
};
const CharacterSkillDeleteDialog = ({ classId, skillId }: Props) => {
  const [open, setOpen] = useState(false);
  const { onDelete, isPending } = useAdminDeleteSkill(classId, skillId);

  const handleDelete = () => {
    void onDelete().then(() => setOpen(false));
  };

  return (
    <ConfirmDialog
      title='스킬 삭제'
      description='해당 스킬을 삭제 하겠습니까?'
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button disabled={isPending} variant='secondary'>
          삭제
        </Button>
      }
      disabled={isPending}
      onSubmit={handleDelete}
      confirmLabel='네'
    />
  );
};

export default CharacterSkillDeleteDialog;
