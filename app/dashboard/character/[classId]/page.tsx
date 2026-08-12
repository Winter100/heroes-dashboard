import CharacterDetail from '@/components/character/character-detail';

const Page = async ({ params }: { params: Promise<{ classId: string }> }) => {
  const { classId } = await params;

  return (
    <div className='max-w-6xl mx-auto w-full'>
      <CharacterDetail classId={classId} />
    </div>
  );
};

export default Page;
