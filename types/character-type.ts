type Gender = 'male' | 'female';
export type Character = {
  id: number;
  name: string;
  image: string;
  gender: Gender;
  releaseDate: string;
  battleType?: string;
};

export type CharacterDetailType = Character & {
  skills: { name: string; image: string; description: string }[];
};
