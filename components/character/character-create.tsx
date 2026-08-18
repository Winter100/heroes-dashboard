'use client';

import { createCharacterFormData } from '@/lib/utils';
import { CharacterFormValues } from '@/schema/character.schema';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import CharacterEditForm from './character-edit-form';
import { useAdminCreateCharacter } from '@/hooks/character/use-admin-character';
import { toast } from '../ui/toast';

const CharacterCreate = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const createMutation = useAdminCreateCharacter();

  const onCreate = (classData: CharacterFormValues) => {
    const { name: className } = classData;
    const formData = createCharacterFormData(classData);

    const promise = createMutation.mutateAsync(formData);

    toast.promise(promise, {
      loading: `${className} 생성중...`,
      success: () => {
        setCreateOpen(false);
        return {
          type: 'success',
          title: className,
          description: '직업이 생성되었습니다.',
        };
      },
      error: (error) => {
        return {
          type: 'error',
          title: className,
          description:
            error instanceof Error
              ? error.message
              : '처리 중 오류가 발생했습니다.',
        };
      },
    });
  };

  return (
    <Dialog open={createOpen} onOpenChange={setCreateOpen}>
      <DialogTrigger render={<Button variant='secondary'>직업 생성</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <CharacterEditForm mode='create' mutate={onCreate} />
      </DialogContent>
    </Dialog>
  );
};

export default CharacterCreate;
