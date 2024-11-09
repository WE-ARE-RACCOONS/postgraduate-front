import { useCallback, useState } from 'react';

interface useDisclosureProps {
  defaultIsOpen?: boolean;
  onClose?(): void;
  onOpen?(): void;
}

export const useDisclosure = (props: useDisclosureProps) => {
  const {
    onClose: onCloseProp,
    onOpen: onOpenProp,
    defaultIsOpen: defaultIsOpenProp,
  } = props;
  const [isOpen, setOpen] = useState(defaultIsOpenProp ?? false);

  const onOpen = useCallback(() => {
    setOpen(true);
    onOpenProp?.();
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
    onCloseProp?.();
  }, []);

  const onToggle = useCallback(() => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  }, [onOpen, onClose, isOpen]);

  return {
    isOpen,
    onToggle,
    onClose,
    onOpen,
  };
};

export type UseDisClosure = ReturnType<typeof useDisclosure>;
