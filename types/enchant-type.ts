export type EnchantType = {
  id: number;
  affixId: number;
  name: string;
  rankId: number;
  tierId: number;
  // category: string;
  effects: { statId: number; value: string }[];
  enchantSlot: { slotId: number }[];
};
