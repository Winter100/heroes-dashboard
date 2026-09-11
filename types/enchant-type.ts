export type EnchantType = {
  id: number;
  affix: { id: number; value: string };
  name: string;
  rank: { id: number; name: string };
  tier: { id: number; value: string };
  effects: { id: number; stat_name: string; stat_value: string }[];
  slot: { id: number; name: string; value: string }[];
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
