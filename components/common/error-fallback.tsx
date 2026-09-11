import { FallbackProps } from 'react-error-boundary';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <Card className='w-full'>
      <CardContent className='flex items-center flex-col justify-center gap-2 h-72'>
        <h3>데이터를 불러오는 중 에러가 발생했습니다.</h3>
        <p>{error instanceof Error ? error.message : '알 수 없는 에러'}</p>
        <Button onClick={resetErrorBoundary}>다시 시도하기</Button>
      </CardContent>
    </Card>
  );
};

export default ErrorFallback;
