export type BossStat = {
  id: number;
  stat_name: string;
  stat_value: string;
  image?: string;
};

export type RaidType = {
  id: string;
  battle: string;
  boss: string;
  image: string | null;
  level: number;
  raidTitle: { id: number; name: string };
  entry: BossStat[];
  limit: BossStat[];
  // bonus: BonusTargetsDto[];
  // clear: BasicClearRewardDto[];
};
