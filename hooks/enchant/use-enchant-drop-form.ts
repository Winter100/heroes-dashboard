import { useAdminCreateEnchantDrop } from '@/hooks/enchant/use-admin-enchant';
import { useRaid } from '@/hooks/raid/use-raid';
import { useEnchantDetail } from '@/hooks/enchant/use-enchant';
import type { RaidType } from '@/types/raid-type';
import { useState } from 'react';

export const useEnchantDropForm = (enchantId: string) => {
  const { data: raids } = useRaid();
  const { data: enchant } = useEnchantDetail(enchantId);
  const { onCreateDrop, isPending } = useAdminCreateEnchantDrop(enchantId);
  const [search, setSearch] = useState<string>('');
  const [selectedRaids, setSelectedRaids] = useState<
    Pick<RaidType, 'id' | 'battle' | 'boss' | 'image'>[]
  >(() =>
    (enchant.drop_list ?? [])
      .filter((drop) => drop.type === 'raid')
      .map((drop) => {
        const matches = raids.filter((entry) =>
          drop.id == null
            ? entry.battle === drop.name
            : String(entry.id) === String(drop.id),
        );
        const raid = matches.length === 1 ? matches[0] : undefined;
        return {
          id: String(raid?.id ?? drop.id ?? ''),
          battle: raid?.battle ?? drop.name,
          boss: raid?.boss ?? '',
          image: raid?.image ?? drop.image,
        };
      }),
  );
  const [created, setCreated] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const searchTerm = search.trim().toLocaleLowerCase();
  const availableRaids = raids.filter(
    (raid) =>
      !selectedRaids.some((selected) => String(selected.id) === String(raid.id)) &&
      (raid.battle.toLocaleLowerCase().includes(searchTerm) ||
        String(raid.id).toLocaleLowerCase().includes(searchTerm)),
  );

  const selectBattle = (id: string) => {
    if (isPending) return;
    const raid = raids.find((entry) => String(entry.id) === String(id));
    if (!raid) return;
    setSelectedRaids((previous) =>
      previous.some((selected) => String(selected.id) === String(id))
        ? previous
        : [...previous, { ...raid, id: String(raid.id) }],
    );
    setCreated(false);
    setValidationError(null);
  };

  const removeBattle = (id: string) => {
    if (isPending) return;
    setSelectedRaids((previous) =>
      previous.filter((raid) => String(raid.id) !== String(id)),
    );
    setCreated(false);
    setValidationError(null);
  };

  const handleSubmit = async (): Promise<void> => {
    if (isPending || selectedRaids.length === 0) return;
    setCreated(false);
    const numericBattleIds = selectedRaids.map((raid) => Number(raid.id));
    const hasValidIds = selectedRaids.every(
      (raid, index) =>
        /^\d+$/.test(String(raid.id)) &&
        Number.isSafeInteger(numericBattleIds[index]),
    );
    if (!hasValidIds) {
      setValidationError('배틀 ID가 올바른 숫자 형식이 아닙니다.');
      return;
    }
    setValidationError(null);

    try {
      await onCreateDrop(numericBattleIds);
      setCreated(true);
    } catch {
      // 요청 실패 알림은 useAdminCreateEnchantDrop의 toast에서 처리합니다.
      setCreated(false);
    }
  };

  return {
    search,
    setSearch,
    availableRaids,
    selectedRaids,
    created,
    isPending,
    validationError,
    selectBattle,
    removeBattle,
    handleSubmit,
  };
};
