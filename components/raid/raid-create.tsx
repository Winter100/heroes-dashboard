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
import { useAdminCreateRaid } from '@/hooks/raid/use-admin-raid';
import { RaidFormValues } from '@/schema/raid-schema';
import RaidEditForm from './raid-edit-form';
import { createRaidFormData } from '@/lib/utils';

const RaidCreate = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const createMutation = useAdminCreateRaid();

  const onCreate = (raidData: RaidFormValues) => {
    const formData = createRaidFormData(raidData);
    const promise = createMutation.mutateAsync(formData);
    toast.promise(promise, {
      loading: `${raidData.battle} 생성중...`,
      success: () => {
        setCreateOpen(false);
        return {
          type: 'success',
          title: raidData.battle,
          description: '레이드가 생성되었습니다.',
        };
      },
      error: (error) => {
        return {
          type: 'error',
          title: raidData.battle,
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
        render={<Button variant='secondary'>레이드 생성</Button>}
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <RaidEditForm
          mode='create'
          mutate={onCreate}
          disabled={createMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
};

export default RaidCreate;
