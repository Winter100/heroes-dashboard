import EnchantDetail from '@/components/enchant/enchant-detail';

/**
 * Todo
 * 인챈트 효과 및 슬롯을 배열로 설정할 수 있게 해야함.
 */
const Page = async ({ params }: { params: Promise<{ enchantId: string }> }) => {
  const { enchantId } = await params;
  return <EnchantDetail enchantId={enchantId} />;
};

export default Page;
