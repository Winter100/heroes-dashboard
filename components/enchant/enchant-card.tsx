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

type Props = {
  enchant: EnchantType;
  isDetailLink?: boolean;
};
const EnchantCard = ({ enchant, isDetailLink = false }: Props) => {
  const router = useRouter();
  return (
    <Card className='mx-auto w-full max-w-sm overflow-hidden pt-0'>
      <div className='relative bg-black/35 aspect-video w-full'></div>
      <CardHeader>
        <CardAction />
        <CardTitle className='mb-1'>{enchant.name}</CardTitle>

        <CardDescription>
          <div className='flex flex-col gap-0.5'>
            <div className='flex items-center gap-2'></div>
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
