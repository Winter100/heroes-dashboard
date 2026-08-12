import { Card, CardContent } from '../ui/card';

type Props = {
  error: Error | null;
};
const QueryError = ({ error }: Props) => {
  return (
    <Card className='w-full'>
      <CardContent className='flex items-center justify-center gap-2 h-72'>
        <p>데이터를 불러오지 못했습니다</p>
        <p>{error?.message}</p>
      </CardContent>
    </Card>
  );
};

export default QueryError;
