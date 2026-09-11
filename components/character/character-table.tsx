'use client';

import { useCharacter } from '@/hooks/character/use-character';
import CharacterCard from './character-card';

const CharacterTable = () => {
  const { data } = useCharacter();

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-2 w-full'>
      {data?.map((character) => (
        <CharacterCard key={character.id} character={character} isDetailLink />
      ))}
    </div>
  );
};

export default CharacterTable;
