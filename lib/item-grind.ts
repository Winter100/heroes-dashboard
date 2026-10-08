import type { GrindGetType } from '@/types/item-type';

type SlotGroup = {
  slots: GrindGetType['grindSlot'][number]['slot'][];
  grinds: GrindGetType[];
};

type TitleGroup = {
  name: string;
  slotGroups: Map<string, SlotGroup>;
};

export const groupGrinds = (data: GrindGetType[]): Map<number, TitleGroup> => {
  const groups = new Map<number, TitleGroup>();

  for (const grind of data) {
    let titleGroup = groups.get(grind.title.id);

    if (!titleGroup) {
      titleGroup = { name: grind.title.name, slotGroups: new Map() };
      groups.set(grind.title.id, titleGroup);
    }

    const slots = grind.grindSlot
      .map(({ slot }) => slot)
      .sort((first, second) => first.id - second.id);
    const slotKey = slots.map((slot) => slot.id).join(',');
    const slotGroup = titleGroup.slotGroups.get(slotKey);

    if (slotGroup) {
      slotGroup.grinds.push(grind);
    } else {
      titleGroup.slotGroups.set(slotKey, { slots, grinds: [grind] });
    }
  }

  for (const group of groups.values()) {
    group.slotGroups = new Map(
      Array.from(group.slotGroups).sort(
        ([, first], [, second]) =>
          Number(second.slots.some((slot) => slot.name === '주무기')) -
          Number(first.slots.some((slot) => slot.name === '주무기')),
      ),
    );
  }

  return groups;
};

