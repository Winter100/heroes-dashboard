import { ReactElement, ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

interface ActionDialogProps {
  trigger: ReactElement;
  title: string;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  description?: string;
  children: ReactNode;
}

const ActionDialog = ({
  trigger,
  title,
  description,
  children,
  open,
  setOpen,
}: ActionDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className='flex flex-col gap-2'>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default ActionDialog;
