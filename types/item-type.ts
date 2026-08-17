export type ItemType = {
  name: string;
  image: string | null;
  description: string | null;
  category: {
    name: string;
    id: number;
  };
  tier: {
    name: string;
    id: number;
  };
  slot: {
    name: string;
    value: string;
    id: number;
  };
  id: number;
};

export type ItemStepType = ItemType & {
  steps?: EquipmentStep[];
};

export type EquipmentStep = {
  id: string;
  stepName: string;
  effects: { name: string; stat_id: number; stat_value: number }[];
};
