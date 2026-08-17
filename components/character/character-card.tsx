import { Button } from '@/components/ui/button';
import { formatDate, getDaysSince } from '@/lib/utils';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Character } from '@/types/character-type';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type Props = {
  character: Character;
  isDetailLink?: boolean;
};
const CharacterCard = ({ character, isDetailLink = false }: Props) => {
  const router = useRouter();
  return (
    <Card className='mx-auto w-full max-w-sm overflow-hidden pt-0'>
      <div className='relative bg-black/35 aspect-video w-full'>
        <Image
          src={character.image}
          alt={character.name}
          fill
          sizes='(max-width: 640px) 100vw, 384px'
          className='object-cover '
        />
      </div>
      <CardHeader>
        <CardAction />
        <CardTitle className='mb-1'>{character.name}</CardTitle>

        <CardDescription>
          <div className='flex flex-col gap-0.5'>
            <div className='flex items-center gap-2'>
              <div className='w-24'>성별</div>
              <div>{character.gender === 'male' ? '남성' : '여성'}</div>
            </div>

            <div className='flex items-center gap-2'>
              <div className='w-24'>스킬수</div>
              <div>{character.skillCount}</div>
            </div>

            <div className='flex items-center gap-2'>
              <div className='w-24'>출시일</div>
              <div>{formatDate(character.releaseDate)}</div>
            </div>

            <div className='flex items-center gap-2'>
              <div className='w-24'>출시후</div>
              <div>
                {getDaysSince(character.releaseDate).toLocaleString()} 일
              </div>
            </div>
          </div>
        </CardDescription>
      </CardHeader>

      {isDetailLink && (
        <CardFooter>
          <Button
            className='w-full'
            onClick={() => router.push(`/dashboard/character/${character.id}`)}
          >
            자세히
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default CharacterCard;
