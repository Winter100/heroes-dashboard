import DashboardResourcePage from '@/components/common/dashboard-resource-page';
import ItemCreateDialog from '@/components/item/dialogs/item-create-dialog';
import ItemRevalidateDialog from '@/components/item/dialogs/item-revalidate-dialog';
import ItemStatistics from '@/components/item/item-statistics';
import ItemList from '@/components/item/list/item-list';

const Page = () => {
  return (
    <DashboardResourcePage
      actions={
        <>
        <ItemCreateDialog />
        <ItemRevalidateDialog />
        </>
      }
      statistics={<ItemStatistics />}
      list={<ItemList />}
    />
  );
};

export default Page;
