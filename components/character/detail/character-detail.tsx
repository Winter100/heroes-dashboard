'use client';

import { useAdminCreateSkill } from '@/hooks/character/use-admin-character';
import { useCharacterSkillList } from '@/hooks/character/use-character';
import CharacterCard from '../card/character-card';
import CharacterSkillCard from '../card/character-skill-card';
import CharacterEditSkillForm from '../forms/character-edit-skill-form';
import CharacterUpdateDialog from '../dialogs/character-update-dialog';
import CharacterDeleteDialog from '../dialogs/character-delete-dialog';

const CharacterDetail = ({ classId }: { classId: string }) => {
  const { data } = useCharacterSkillList(classId);

  const { isPending, onCreate } = useAdminCreateSkill(classId);

  return (
    <div className='gap-2 flex-col mx-auto flex items-center'>
      <div className='mx-auto'>
        {/* 직업 정보 수정 Dialog */}
        <CharacterUpdateDialog classId={classId} data={data} />

        {/* 직업 삭제 Dialog */}
        <CharacterDeleteDialog classId={classId} name={data.name} />
      </div>

      {/* 직업 카드 */}
      <CharacterCard character={data} />

      {/* 직업 스킬 카드 */}
      <div className='grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-2 w-full'>
        {data?.skills.map((skill) => (
          <CharacterSkillCard key={skill.name} classId={classId} {...skill} />
        ))}
        <CharacterEditSkillForm
          onSubmit={onCreate}
          mode='create'
          onCancel={() => {}}
          disabled={isPending}
        />
      </div>
    </div>
  );
};

export default CharacterDetail;
