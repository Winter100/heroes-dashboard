import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { useState } from 'react';
import ChracterEditSkill from './character-edit-skill';
import z from 'zod';
import { characterSkillSchema } from '@/schema/character.schema';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type Props = {
  name: string;
  description: string;
  id: number;
  onSubmit: (
    data: z.infer<typeof characterSkillSchema>,
    mode: 'create' | 'update',
    optional?: () => void,
  ) => void;
  onDelete: (skillName: string, skillId: number) => void;
};
const CharacterSkillCard = ({
  name,
  description,
  id,
  onSubmit,
  onDelete,
}: Props) => {
  const [isEdit, setIsEdit] = useState(false);

  const onCancel = () => {
    setIsEdit((pre) => !pre);
  };

  if (isEdit) {
    return (
      <ChracterEditSkill
        defaultData={{ name, description }}
        onSubmit={onSubmit}
        onCancel={onCancel}
        mode='update'
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
          <Button variant='secondary' onClick={() => setIsEdit((pre) => !pre)}>
            수정
          </Button>

          <Dialog>
            <DialogTrigger render={<Button variant='secondary'>삭제</Button>} />
            <DialogContent className='sm:max-w-sm'>
              <DialogHeader>
                <DialogTitle>{name}</DialogTitle>
                <DialogDescription className='text-red-300'>
                  해당 스킬을 삭제 하겠습니까?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant='outline'>취소</Button>} />
                <Button
                  variant='destructive'
                  onClick={() => onDelete(name, id)}
                >
                  삭제
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>
      <CardContent className='whitespace-pre-line'>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
};

export default CharacterSkillCard;
