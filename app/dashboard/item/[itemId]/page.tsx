import ItemDetail from '@/components/item/item-detail';

const Page = async ({ params }: { params: Promise<{ itemId: string }> }) => {
  const { itemId } = await params;

  return (
    <div className='max-w-6xl mx-auto w-full'>
      <ItemDetail itemId={itemId} />
    </div>
  );
};

export default Page;
