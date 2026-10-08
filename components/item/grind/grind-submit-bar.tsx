import { Button } from '@/components/ui/button';

type GrindSubmitBarProps = {
  selectedCount: number;
  isPending: boolean;
  onSubmit: () => Promise<void>;
};

const GrindSubmitBar = ({ selectedCount, isPending, onSubmit }: GrindSubmitBarProps) => {
  return (
    <div className='sticky bottom-4 z-20 flex items-center justify-between gap-3 rounded-xl border bg-background/95 p-3 shadow-sm'>
      <p role='status' className='text-sm text-muted-foreground'>
        선택한 연마 <span className='font-semibold text-foreground'>{selectedCount}개</span>
      </p>
      <Button
        type='button'
        disabled={isPending || selectedCount === 0}
        onClick={() => void onSubmit()}
      >
        {isPending ? '등록 중...' : '연마 등록'}
      </Button>
    </div>
  );
};

export default GrindSubmitBar;
