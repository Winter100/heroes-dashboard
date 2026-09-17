import CharacterCreateDialog from '@/components/character/dialogs/character-create-dialog';
import CharacterRevalidateDialog from '@/components/character/dialogs/character-revalidate-dialog';
import CharacterStatistics from '@/components/character/character-statistics';
import CharacterList from '@/components/character/list/character-list';
import DashboardResourcePage from '@/components/common/dashboard-resource-page';

const Page = () => {
  return (
    <DashboardResourcePage
      actions={
        <>
        <CharacterCreateDialog />
        <CharacterRevalidateDialog />
        </>
      }
      statistics={<CharacterStatistics />}
      list={<CharacterList />}
    />
  );
};

export default Page;
