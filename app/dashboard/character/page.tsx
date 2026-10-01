import CharacterCreateDialog from '@/components/character/dialogs/character-create-dialog';
import CharacterStatistics from '@/components/character/character-statistics';
import { ADMIN_ROLES, RoleGate } from '@/components/auth/role-gate';
import CharacterList from '@/components/character/list/character-list';
import DashboardResourcePage from '@/components/common/dashboard-resource-page';

const Page = () => {
  return (
    <DashboardResourcePage
      actions={
        <RoleGate allowedRoles={ADMIN_ROLES}>
          <CharacterCreateDialog />
        </RoleGate>
      }
      statistics={<CharacterStatistics />}
      list={<CharacterList />}
    />
  );
};

export default Page;
