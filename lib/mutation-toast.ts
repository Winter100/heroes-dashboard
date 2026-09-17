import type { ToastManagerPromiseOptions } from '@base-ui/react/toast';
import { toast } from '@/components/ui/toast';

export const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

export const showMutationToast = <T>(
  promise: Promise<T>,
  options: ToastManagerPromiseOptions<T, object>,
) => toast.promise(promise, options);
