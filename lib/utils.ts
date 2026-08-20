import {
  CharacterFormValues,
  CharacterSkillFormValues,
} from '@/schema/character.schema';
import { ItemFormValues } from '@/schema/item.schema';
import { RaidFormValues } from '@/schema/raid-schema';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDaysSince(date: Date | string): number {
  const target = typeof date === 'string' ? new Date(date) : date;

  return Math.floor((Date.now() - target.getTime()) / (1000 * 60 * 60 * 24));
}

export function formatDate(date: Date | string): string {
  const target = typeof date === 'string' ? new Date(date) : date;

  return target.toISOString().slice(0, 10);
}

export const createCharacterFormData = (characterData: CharacterFormValues) => {
  const formData = new FormData();
  formData.append('name', characterData.name);
  formData.append('gender', characterData.gender);
  formData.append('releaseDate', characterData.releaseDate);

  if (characterData.image instanceof File) {
    formData.append('image', characterData.image);
  }

  return formData;
};
export const createRaidFormData = (raidData: RaidFormValues) => {
  const formData = new FormData();
  formData.append('raidId', raidData.raidId.toString());
  formData.append('battle', raidData.battle);
  formData.append('boss', raidData.boss);
  formData.append('level', raidData.level.toString());

  if (raidData.image instanceof File) {
    formData.append('image', raidData.image);
  }

  return formData;
};
export const createItemFormData = (itemData: ItemFormValues) => {
  const formData = new FormData();
  formData.append('name', itemData.name);
  formData.append('categoryId', itemData.categoryId.toString());
  formData.append('tierId', itemData.tierId.toString());

  if (itemData.description) {
    formData.append('description', itemData.description);
  }
  if (itemData.image instanceof File) {
    formData.append('image', itemData.image);
  }

  return formData;
};

export const createCharacterSkillFormData = (
  skill: CharacterSkillFormValues,
  classIds: string[],
) => {
  const formData = new FormData();
  formData.append('name', skill.name);
  formData.append('description', skill.description);
  formData.append('classIds', JSON.stringify(classIds));

  if (skill.image instanceof File) {
    formData.append('image', skill.image);
  }

  return formData;
};
