'use client';

import { revalidateApi } from '@/api/revalidate-api';
import type { RevalidateTag } from '@/constant/constant';
import { getErrorMessage, showMutationToast } from '@/lib/mutation-toast';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';

type DetailRevalidateButtonProps = {
  resourceName: string;
  tag: RevalidateTag;
  id?: string;
};

const DetailRevalidateButton = ({
  id,
  resourceName,
  tag,
}: DetailRevalidateButtonProps) => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: () => revalidateApi.request({ tag, id }),
  });

  const handleRevalidate = (): void => {
    const promise = mutateAsync();

    showMutationToast(promise, {
      loading: `${resourceName} 작업 중`,
      success: `${resourceName} 작업 완료`,
      error: (error) =>
        getErrorMessage(error, `${resourceName} 작업에 실패했습니다.`),
    });
  };

  return (
    <Button
      type='button'
      variant='secondary'
      disabled={isPending}
      onClick={handleRevalidate}
    >
      {isPending ? '작업 중...' : resourceName}
    </Button>
  );
};

export default DetailRevalidateButton;
