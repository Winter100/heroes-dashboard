import DashboardResourcePage from '@/components/common/dashboard-resource-page';
import EnchantCreateDialog from '@/components/enchant/dialogs/enchant-create-dialog';
import EnchantRevalidateDialog from '@/components/enchant/dialogs/enchant-revalidate-dialog';
import EnchantStatistics from '@/components/enchant/enchant-statistics';
import EnchantList from '@/components/enchant/list/enchant-list';

const Page = () => {
  return (
    <DashboardResourcePage
      actions={
        <>
        <EnchantCreateDialog />
        <EnchantRevalidateDialog />
        </>
      }
      statistics={<EnchantStatistics />}
      list={<EnchantList />}
    />
  );
};

export default Page;
