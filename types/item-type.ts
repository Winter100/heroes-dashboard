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
  id: number;
};

export type ItemStepType = ItemType & {
  equipmentStep?: EquipmentStep[];
};

type EquipmentStep = {
  id: number;
  itemId: number;
  stepName: string;
};
