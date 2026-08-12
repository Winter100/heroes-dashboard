type Gender = 'male' | 'female';
export type Character = {
  id: string;
  name: string;
  image: string;
  gender: Gender;
  releaseDate: string;
  skillCount: string;
  battleType?: string;
};

export type CharacterDetailType = Character & {
  skills: { id: string; name: string; image: string; description: string }[];
};

export type GenderCount = { count: number; gender: string; fill: string };
export type YearStatistics = { year: number; count: number };
export type Statistics = {
  genderCount: GenderCount[];
  year: YearStatistics[];
};
