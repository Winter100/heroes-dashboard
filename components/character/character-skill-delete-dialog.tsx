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
  const { onDelete, isPending: deleteSkillPending } = useAdminDeleteSkill(
    classId,
    skillId,
  );
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    void onDelete().then(
      () => setOpen(false),
      () => undefined,
    );
  };

  return (
    <ConfirmDialog
      title='스킬 삭제'
      description='해당 스킬을 삭제 하겠습니까?'
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button disabled={deleteSkillPending} variant='secondary'>
          삭제
        </Button>
      }
      pending={deleteSkillPending}
      onConfirm={handleDelete}
    />
  );
};

export default CharacterSkillDeleteDialog;
