import { CharacterDetailType } from '@/types/character-type';
import CharacterSkillCard from './character-skill-card';
import CharacterEditSkillForm from './character-edit-skill-form';
import { useAdminCharacterSkill } from '@/hooks/character/use-admin-character-skill';
import { CharacterSkillFormValues } from '@/schema/character.schema';
import { toast } from '../ui/toast';
import { createCharacterSkillFormData } from '@/lib/utils';

type Props = {
  classId: string;
  data: CharacterDetailType;
};
const CharacterSkillContainer = ({ classId, data }: Props) => {
  const { createSkillMutation } = useAdminCharacterSkill(classId);

  const onCreate = async (
    skill: CharacterSkillFormValues,
    optional?: () => void,
  ) => {
    const { name: skillName } = skill;
    const formData = createCharacterSkillFormData(skill, classId);
    const promise = createSkillMutation.mutateAsync(formData);

    toast.promise(promise, {
      loading: `${skillName} 등록 중...`,
      success: () => {
        optional?.();
        return {
          type: 'success',
          title: skillName,
          description: '스킬이 등록되었습니다.',
        };
      },
      error: (error) => {
        return {
          type: 'error',
          title: skillName,
          description:
            error instanceof Error
              ? error.message
              : '처리 중 오류가 발생했습니다.',
        };
      },
    });
  };

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4 w-full'>
      {data?.skills.map((skill) => (
        <CharacterSkillCard key={skill.name} classId={classId} {...skill} />
      ))}
      <CharacterEditSkillForm
        onSubmit={onCreate}
        mode='create'
        onCancel={() => {}}
        disabled={createSkillMutation.isPending}
      />
    </div>
  );
};

export default CharacterSkillContainer;
