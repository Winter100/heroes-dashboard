import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { EnchantType } from '@/types/enchant-type';
import { FallbackImage } from '../../fallback-image';
import { AFFIX_LABELS, getEnchantImage, isEnchantAffix } from '@/lib/utils';

type Props = {
  enchant: EnchantType;
  isDetailLink?: boolean;
};

const EnchantCard = ({ enchant, isDetailLink = false }: Props) => {
  const router = useRouter();
  const affix = enchant.affix.value.toLowerCase();
  const affixLabel = isEnchantAffix(affix)
    ? AFFIX_LABELS[affix]
    : enchant.affix.value;
  const imageSource = getEnchantImage(affix, enchant.rank.name);

  return (
    <Card className='mx-auto w-full max-w-sm overflow-hidden pt-0'>
      <div className='aspect-video flex items-center justify-center w-full'>
        <div className='relative w-10 h-10'>
          <FallbackImage
            src={imageSource}
            alt={`${enchant.name} ${affixLabel} 인챈트`}
            fill
          />
        </div>
      </div>
      <CardHeader>
        <CardAction />
        <CardTitle className='mb-1'>{enchant.name}</CardTitle>

        <CardDescription>
          <div className='flex flex-col gap-0.5'>
            <div className='flex items-center gap-2'>
              <div className='w-20'>접두/접미</div>
              <div>{affixLabel}</div>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-20'>랭크</div>
              <div>{enchant.rank.name}</div>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-20'>효과</div>
              <div>{enchant.effects.length}</div>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-20'>얻는 곳</div>
              <div>{enchant.drop_list?.length}</div>
            </div>
          </div>
        </CardDescription>
      </CardHeader>

      {isDetailLink && (
        <CardFooter>
          <Button
            className='w-full'
            onClick={() => router.push(`/dashboard/enchant/${enchant.id}`)}
          >
            자세히
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default EnchantCard;
