import CharacterDetail from '@/components/character/character-detail';

const Page = async ({ params }: { params: Promise<{ classId: string }> }) => {
  const { classId } = await params;

  return (
    <div>
      <CharacterDetail classId={classId} />
    </div>
  );
};

export default Page;
