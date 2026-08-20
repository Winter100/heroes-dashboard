'use client';

import { Button } from '../ui/button';
import { toast } from '../ui/toast';
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
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import QueryError from '../common/query-error';
import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import RaidCard from './raid-card';
import { useRaidDetail } from '@/hooks/raid/use-raid';
import {
  useAdminDeleteRaid,
  useAdminUpdateRaid,
  useAdminUpsertRaidDetail,
} from '@/hooks/raid/use-admin-raid';
import RaidEditForm from './raid-edit-form';
import { RaidEffectsFormValues, RaidFormValues } from '@/schema/raid-schema';
import { createRaidFormData } from '@/lib/utils';
import { useStats } from '@/hooks/item/use-item';
import RaidStatsEditContainer from './raid-stats-edit-container';

const RaidDetail = () => {
  const { raidId } = useParams<{ raidId: string }>();
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { isLoading, data, error } = useRaidDetail(raidId);
  const {
    isLoading: statsLoading,
    data: stats,
    error: statsError,
  } = useStats();

  const updateMutation = useAdminUpdateRaid(raidId);
  const deleteMutation = useAdminDeleteRaid(raidId);
  const upsertDetailMutation = useAdminUpsertRaidDetail(raidId);

  if (isLoading || statsLoading)
    return (
      <div className='space-y-2'>
        <Card className='w-full max-w-sm mx-auto'>
          <CardContent>
            <Skeleton className='h-72 w-full' />
          </CardContent>
        </Card>
        <div className='grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-2 w-full'>
          {Array.from({ length: 10 }).map((_, i) => (
            <Card key={i} className='w-full max-w-sm'>
              <CardContent>
                <Skeleton className='h-96 w-full' />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );

  if (error || statsError) return <QueryError error={error} />;

  if (!data || !stats) {
    return (
      <Card className='w-full'>
        <CardContent className='flex items-center justify-center gap-2 h-72'>
          <p>레이드를 찾지 못했습니다</p>
        </CardContent>
      </Card>
    );
  }

  const onEdit = (raidData: RaidFormValues) => {
    const formData = createRaidFormData(raidData);

    const promise = updateMutation.mutateAsync(formData);

    toast.promise(promise, {
      loading: `${raidData.battle} 수정 중...`,
      success: () => {
        setEditOpen(false);
        return `${raidData.battle}가 수정되었습니다.`;
      },
      error: (error) =>
        error instanceof Error ? error.message : '수정에 실패했습니다.',
    });
  };

  const onDelete = () => {
    const promise = deleteMutation.mutateAsync();

    toast.promise(promise, {
      loading: `${data.battle} 삭제 중...`,
      success: () => {
        setDeleteOpen(false);
        router.push('/dashboard/raid');
        return `${data.battle}가 삭제되었습니다.`;
      },
      error: (error) =>
        error instanceof Error ? error.message : '삭제에 실패했습니다.',
    });
  };

  const onUpsert = (mode: string, boss: RaidEffectsFormValues) => {
    if (boss.effects.length === 0) return;
    const upsertData = {
      mode,
      effects: boss.effects,
    };
    const promise = upsertDetailMutation.mutateAsync(upsertData);

    toast.promise(promise, {
      loading: `${data.battle} 변경 중...`,
      success: () => {
        return `${data.battle}가 변경되었습니다.`;
      },
      error: (error) =>
        error instanceof Error ? error.message : '변경에 실패했습니다.',
    });
  };

  return (
    <div className='gap-2 flex-col mx-auto flex w-full items-center'>
      <div className='mx-auto'>
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogTrigger render={<Button variant='secondary'>수정</Button>} />
          <DialogContent>
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <RaidEditForm
              defaultValues={data}
              mode='update'
              mutate={onEdit}
              disabled={updateMutation.isPending}
            />
          </DialogContent>
        </Dialog>
        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DialogTrigger render={<Button variant='destructive'>삭제</Button>} />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{data.battle}</DialogTitle>
              <DialogDescription className='text-red-300'>
                해당 전투를 삭제 하겠습니까?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant='outline'>취소</Button>} />
              <Button variant='destructive' onClick={onDelete}>
                네
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <RaidCard raid={data} />
      <div className='grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-2 w-full'>
        <div className='w-full max-w-sm'>
          <RaidStatsEditContainer
            raidId={raidId}
            effects={data.entry.map((s) => ({
              ...s,
              stat_value: s.stat_value.toString(),
            }))}
            stats={stats}
            mode='ENTRY'
            onEdit={onUpsert}
            disabled={upsertDetailMutation.isPending}
          />
        </div>
        <div className='w-full max-w-sm'>
          <RaidStatsEditContainer
            raidId={raidId}
            effects={data.limit.map((s) => ({
              ...s,
              stat_value: s.stat_value.toString(),
            }))}
            stats={stats}
            mode='LIMIT'
            onEdit={onUpsert}
            disabled={upsertDetailMutation.isPending}
          />
        </div>
      </div>
    </div>
  );
};

export default RaidDetail;
