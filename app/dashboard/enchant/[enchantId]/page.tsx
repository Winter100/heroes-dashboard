import EnchantDetail from '@/components/enchant/enchant-detail';

const Page = async ({ params }: { params: Promise<{ enchantId: string }> }) => {
  const { enchantId } = await params;
  return <EnchantDetail enchantId={enchantId} />;
};

export default Page;
