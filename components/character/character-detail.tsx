'use client';

import { Button } from '../ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import CharacterEditForm from './character-edit-form';
import {
  useAdminCreateSkill,
  useAdminDeleteCharacter,
  useAdminUpdateCharacter,
} from '@/hooks/character/use-admin-character';
import { useCharacterSkillList } from '@/hooks/character/use-character';
import QueryError from '../common/query-error';
import CharacterCard from './character-card';
import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import CharacterSkillCard from './character-skill-card';
import CharacterEditSkillForm from './character-edit-skill-form';
import ActionDialog from '../common/action-dialog';

const CharacterDetail = ({ classId }: { classId: string }) => {
  const { isLoading, data, error } = useCharacterSkillList(classId);

  const { isPending: createSkillPending, onCreate } =
    useAdminCreateSkill(classId);

  const { onEdit, editOpen, setEditOpen } = useAdminUpdateCharacter(classId);

  const {
    isPending: deleteCharacterPending,
    onDelete,
    deleteOpen,
    setDeleteOpen,
  } = useAdminDeleteCharacter(classId);

  if (isLoading)
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

  if (error) return <QueryError error={error} />;

  if (!data) {
    return (
      <Card className='w-full'>
        <CardContent className='flex items-center justify-center gap-2 h-72'>
          <p>캐릭터를 찾지 못했습니다</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='gap-2 flex-col mx-auto flex items-center'>
      <div className='mx-auto'>
        {/* 직업 정보 수정 Dialog */}
        <ActionDialog
          title='직업 정보 수정'
          open={editOpen}
          setOpen={setEditOpen}
          trigger={<Button variant='secondary'>수정</Button>}
        >
          <CharacterEditForm
            defaultValues={data}
            mode='update'
            mutate={onEdit}
          />
        </ActionDialog>

        {/* 직업 삭제 Dialog */}
        <ActionDialog
          title={data.name}
          open={deleteOpen}
          setOpen={setDeleteOpen}
          trigger={<Button variant='destructive'>삭제</Button>}
          description='해당 직업을 삭제 하겠습니까?'
        >
          <DialogFooter>
            <DialogClose render={<Button variant='outline'>취소</Button>} />
            <Button
              variant='destructive'
              onClick={() => {
                onDelete(data.name);
              }}
              disabled={deleteCharacterPending}
            >
              네
            </Button>
          </DialogFooter>
        </ActionDialog>
      </div>

      {/* 직업 카드 */}
      <CharacterCard character={data} />
      <div className='grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-2 w-full'>
        {data?.skills.map((skill) => (
          <CharacterSkillCard key={skill.name} classId={classId} {...skill} />
        ))}
        <CharacterEditSkillForm
          onSubmit={onCreate}
          mode='create'
          onCancel={() => {}}
          disabled={createSkillPending}
        />
      </div>
    </div>
  );
};

export default CharacterDetail;
