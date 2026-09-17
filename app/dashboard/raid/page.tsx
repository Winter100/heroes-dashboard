import DashboardResourcePage from '@/components/common/dashboard-resource-page';
import RaidCreateDialog from '@/components/raid/dialogs/raid-create-dialog';
import RaidStatistics from '@/components/raid/raid-statistics';
import RaidList from '@/components/raid/list/raid-list';
import RaidRevalidateDialog from '@/components/raid/dialogs/raid-revalidate-dialog';

const Page = () => {
  return (
    <DashboardResourcePage
      actions={
        <>
        <RaidCreateDialog />
        <RaidRevalidateDialog />
        </>
      }
      statistics={<RaidStatistics />}
      list={<RaidList />}
    />
  );
};

export default Page;
