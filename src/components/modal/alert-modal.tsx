'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Loader2 } from 'lucide-react';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  actionName?: string;
  onLoadActionName?: string;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  actionName,
  onLoadActionName,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title='Are you sure?'
      description='This action cannot be undone.'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='flex w-full items-center justify-end space-x-2 pt-6'>
        <Button disabled={loading} variant='outline' onClick={onClose}>
          Cancel
        </Button>
        {loading ? (
          <Button disabled={loading} variant='destructive' onClick={onConfirm}>
            {onLoadActionName}
            <Loader2 className='ml-2 size-4 shrink-0 animate-spin' />
          </Button>
        ) : (
          <Button disabled={loading} variant='destructive' onClick={onConfirm}>
            {actionName}
          </Button>
        )}
      </div>
    </Modal>
  );
};
