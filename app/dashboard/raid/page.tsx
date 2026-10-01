import DashboardResourcePage from '@/components/common/dashboard-resource-page';
import { ADMIN_ROLES, RoleGate } from '@/components/auth/role-gate';
import RaidCreateDialog from '@/components/raid/dialogs/raid-create-dialog';
import RaidStatistics from '@/components/raid/raid-statistics';
import RaidList from '@/components/raid/list/raid-list';
import RaidRevalidateDialog from '@/components/raid/dialogs/raid-revalidate-dialog';

const Page = () => {
  return (
    <DashboardResourcePage
      actions={
        <RoleGate allowedRoles={ADMIN_ROLES}>
          <RaidCreateDialog />
          <RaidRevalidateDialog />
        </RoleGate>
      }
      statistics={<RaidStatistics />}
      list={<RaidList />}
    />
  );
};

export default Page;
