import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import ChracterEditSkill from './character-edit-skill-form';
import { useAdminUpdateSkill } from '@/hooks/character/use-admin-character';
import CharacterSkillDeleteDialog from './character-skill-delete-dialog';
import { useState } from 'react';
import { CharacterSkillFormValues } from '@/schema/character.schema';

type Props = {
  name: string;
  description: string;
  id: string;
  classId: string;
};
const CharacterSkillCard = ({
  id: skillId,
  name,
  description,
  classId,
}: Props) => {
  const [open, setOpen] = useState(false);

  const { onEdit, isPending } = useAdminUpdateSkill(classId, skillId);

  const handleSubmit = (data: CharacterSkillFormValues) => {
    void onEdit(data).then(() => setOpen(false));
  };

  if (open) {
    return (
      <ChracterEditSkill
        defaultValues={{ name, description }}
        onSubmit={handleSubmit}
        onCancel={() => setOpen(false)}
        mode='update'
        disabled={isPending}
      />
    );
  }

  return (
    <Card key={name} className='max-w-sm w-full h-full min-h-72'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <div className='w-7 h-7 border border-red-300'></div>
          <div>{name}</div>
        </CardTitle>
        <CardDescription></CardDescription>
        <CardAction>
          <Button variant='secondary' onClick={() => setOpen(true)}>
            수정
          </Button>
          <CharacterSkillDeleteDialog classId={classId} skillId={skillId} />
        </CardAction>
      </CardHeader>
      <CardContent className='whitespace-pre-line'>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
};

export default CharacterSkillCard;
