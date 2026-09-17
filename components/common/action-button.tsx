import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';

interface ActionButtonProps {
  label: string;
  variant?: 'default' | 'secondary' | 'destructive';
  onRequest: () => Promise<unknown>;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export function ActionButton({
  label,
  variant = 'secondary',
  onRequest,
}: ActionButtonProps) {
  const { isPending, mutate } = useMutation({
    mutationFn: onRequest,
  });

  return (
    <Button variant={variant} onClick={() => mutate()} disabled={isPending}>
      {isPending ? '처리 중...' : label}
    </Button>
  );
}
