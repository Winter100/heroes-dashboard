import { ReactElement } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

interface ConfirmDialogProps {
  trigger: ReactElement;
  title: string;
  description?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  confirmLabel?: string;
  disabled?: boolean;
  formId?: string;
  children?: React.ReactNode;
  onSubmit?: () => void;
}

const ConfirmDialog = ({
  trigger,
  title,
  description,
  open,
  onOpenChange,
  confirmLabel,
  disabled = false,
  children,
  onSubmit,
  formId,
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        <DialogFooter>
          <Button
            type='button'
            variant='outline'
            disabled={disabled}
            onClick={() => onOpenChange(false)}
          >
            취소
          </Button>
          <Button
            type={formId ? 'submit' : 'button'}
            form={formId}
            variant='outline'
            disabled={disabled}
            onClick={formId ? undefined : onSubmit}
          >
            {disabled ? '...' : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
