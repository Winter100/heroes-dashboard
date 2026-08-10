type Gender = 'male' | 'female';
export type Character = {
  id: string;
  name: string;
  image: string;
  gender: Gender;
  releaseDate: string;
  battleType?: string;
};

export type CharacterDetailType = Character & {
  skills: { id: string; name: string; image: string; description: string }[];
};
