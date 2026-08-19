'use client';

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
import { toast } from '../ui/toast';
import EnchantEditForm from './enchant-edit-form';
import { EnchantFormValues } from '@/schema/enchant-schema';
import { useAdminCreateEnchant } from '@/hooks/enchant/use-admin-enchant';

const EnchantCreate = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const createMutation = useAdminCreateEnchant();

  const onCreate = (enchantData: EnchantFormValues) => {
    const promise = createMutation.mutateAsync(enchantData);

    toast.promise(promise, {
      loading: `${enchantData.name} 생성중...`,
      success: () => {
        setCreateOpen(false);
        return {
          type: 'success',
          title: enchantData.name,
          description: '인챈트가 생성되었습니다.',
        };
      },
      error: (error) => {
        return {
          type: 'error',
          title: enchantData.name,
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
      <DialogTrigger
        render={<Button variant='secondary'>인챈트 생성</Button>}
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <EnchantEditForm
          mode='create'
          mutate={onCreate}
          disabled={createMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EnchantCreate;
