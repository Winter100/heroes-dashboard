import {
  CharacterFormValues,
  CharacterSkillFormValues,
} from '@/schema/character.schema';
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
