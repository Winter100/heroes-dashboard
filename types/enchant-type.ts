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

export type EnchantStatistics = {
  total: number;
  ranks: {
    rank: string;
    count: number;
  }[];
  tiers: {
    rank: string;
    count: number;
  }[];
  affixs: {
    name: string;
    count: number;
  }[];
};
