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

export type ItemStatistics = {
  total: number;
  tiers: {
    name: string;
    count: number;
  }[];
  categories: {
    name: string;
    count: number;
  }[];
};

export type ItemRecipe = {
  id: string;
  name: string;
  level: string;
  image?: string;
  slot: string;
  effects: { stat_name: string; stat_value: string }[];
  category: string;
  tier: string;
  description: string;
};

export type ItemStepRecipe = {
  category: string;
  name: string;
  tier: string;
  image?: string;
  materials: Material[];
};

export type Material = {
  materialId: string;
  name: string;
  image?: string;
  quantity: number;
};

export type SelectedRecipe = Pick<ItemRecipe, 'id' | 'name' | 'image'> & {
  quantity: number;
};

export type StepRecipeInput = {
  stepId: string;
  quantity: number;
};

export type ItemGrindResponse = {
  itemGrind: { grindId: number }[];
};

export type GrindGetType = {
  id: number;
  title: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  stat: {
    id: number;
    name: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  };
  statOneValue: number;
  statMaxValue: number;
  grindSlot: {
    slot: {
      id: number;
      name: string;
      value: string;
      createdAt: string;
      updatedAt: string;
    };
  }[];
  grindIngredient: {
    item: {
      id: number;
      name: string;
    };
    quantity: number;
  }[];
};
