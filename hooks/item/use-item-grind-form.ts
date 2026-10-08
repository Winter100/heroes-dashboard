'use client';

import { useState } from 'react';
import {
  useAdminCreateGrind,
  useAdminGetAllGrind,
  useAdminGetGrind,
} from './use-admin-grind';

export const useItemGrindForm = (itemId: string) => {
  const { data } = useAdminGetAllGrind();
  const { data: itemGrind } = useAdminGetGrind(itemId);
  const { onCreateGrind, isPending } = useAdminCreateGrind(itemId);
  const [selectedIds, setSelectedIds] = useState<number[]>(() => {
    const savedIds = new Set(itemGrind.itemGrind.map((grind) => grind.grindId));
    return data
      .filter((grind) => savedIds.has(grind.id))
      .map((grind) => grind.id);
  });

  const toggleGrind = (grindId: number): void => {
    if (isPending) return;
    setSelectedIds((previous) =>
      previous.includes(grindId)
        ? previous.filter((id) => id !== grindId)
        : [...previous, grindId],
    );
  };

  const handleSubmit = async (): Promise<void> => {
    if (isPending || selectedIds.length === 0) return;

    try {
      await onCreateGrind([...selectedIds]);
    } catch {}
  };

  return { data, itemGrind, selectedIds, isPending, toggleGrind, handleSubmit };
};
