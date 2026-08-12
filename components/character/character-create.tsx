'use client';

import { createCharacterFormData } from '@/lib/utils';
import { CharacterFormValues } from '@/schema/character.schema';
import { useState } from 'react';
import { toast } from 'sonner';
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
        return `${className}가 생성되었습니다.`;
      },
      error: (error) =>
        error instanceof Error ? error.message : '등록에 실패했습니다.',
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
