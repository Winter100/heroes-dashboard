import CharacterDetail from '@/components/character/character-detail';
// 여기서 수정, 스킬 추가 등 가능하게 하기
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div>
      <CharacterDetail id={id} />
    </div>
  );
};

export default Page;
