import { useAdminUpdateEnchant } from '@/hooks/enchant/use-admin-enchant';
import ActionDialog from '../common/action-dialog';
import { Button } from '../ui/button';
import EnchantEditForm from './enchant-edit-form';
import { EnchantType } from '@/types/enchant-type';

type Props = {
  enchantId: string;
  data?: EnchantType;
};

const EnchantEditDialog = ({ enchantId, data }: Props) => {
  const {
    onEdit,
    isPending: updatePending,
    editOpen,
    setEditOpen,
  } = useAdminUpdateEnchant(enchantId);

  return (
    <ActionDialog
      open={editOpen}
      setOpen={setEditOpen}
      trigger={<Button variant='secondary'>수정</Button>}
      title='인챈트 수정'
    >
      <EnchantEditForm
        defaultValues={data}
        mode='update'
        mutate={onEdit}
        disabled={updatePending}
      />
    </ActionDialog>
  );
};

export default EnchantEditDialog;
