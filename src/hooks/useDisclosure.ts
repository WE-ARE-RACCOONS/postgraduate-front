import { useCallback, useState } from 'react';

interface useDisclosureProps {
  defaultIsOpen?: boolean;
  handleClose?: () => void;
  handleOpen?: () => void;
}

export const useDisclosure = ({
  handleClose = () => {},
  handleOpen = () => {},
  defaultIsOpen = false,
}: useDisclosureProps = {}) => {
  const [isOpen, setOpen] = useState(defaultIsOpen);

  const onOpen = useCallback(() => {
    setOpen(true);
    handleOpen();
  }, [handleOpen]);

  const onClose = useCallback(() => {
    setOpen(false);
    handleClose();
  }, [handleClose]);

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
