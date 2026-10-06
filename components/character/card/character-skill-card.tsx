import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../../ui/button';
import ChracterEditSkill from '../forms/character-edit-skill-form';
import { useAdminUpdateSkill } from '@/hooks/character/use-admin-character';
import CharacterSkillDeleteDialog from '../dialogs/character-skill-delete-dialog';
import { useState } from 'react';
import { CharacterSkillFormValues } from '@/schema/character.schema';
import { ADMIN_ROLES, RoleGate } from '@/components/auth/role-gate';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ImageOff } from 'lucide-react';

type Props = {
  name: string;
  description: string;
  id: string;
  classId: string;
  image?: string | null;
};
const CharacterSkillCard = ({
  id: skillId,
  name,
  description,
  classId,
  image,
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
          <Avatar className='size-7 rounded-md after:rounded-md'>
            <AvatarImage
              src={image?.trim() || undefined}
              alt={`${name} 스킬`}
              className='rounded-md'
            />
            <AvatarFallback className='rounded-md' aria-label='이미지 없음'>
              <ImageOff className='size-4' aria-hidden='true' />
            </AvatarFallback>
          </Avatar>
          <h4>{name}</h4>
        </CardTitle>
        <CardDescription></CardDescription>
        <RoleGate allowedRoles={ADMIN_ROLES}>
          <CardAction>
            <Button variant='secondary' onClick={() => setOpen(true)}>
              수정
            </Button>
            <CharacterSkillDeleteDialog classId={classId} skillId={skillId} />
          </CardAction>
        </RoleGate>
      </CardHeader>
      <CardContent className='whitespace-pre-line'>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
};

export default CharacterSkillCard;
