import { useDescendats } from '@/hooks/useDescendant';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useOutSideClick } from '@/hooks/useOutsideClick';
import { useCallback, useEffect, useRef } from 'react';

export interface DropDownMenuProp {
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

export const useDropdown = (prop: DropDownMenuProp = {}) => {
  const { isOpen: isOpenProp, onClose: onCloseProp, onOpen: onOpenProp } = prop;

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOpenInternal = useCallback(() => {
    onOpenProp?.();
  }, []);

  const descendants = useDescendats();
  const { onClose, isOpen } = useDisclosure({
    defaultIsOpen: isOpenProp,
    handleClose: onCloseProp,
    handleOpen: handleOpenInternal,
  });

  useOutSideClick({
    ref: dropdownRef,
    handler: (e) => {
      e.stopPropagation();
      onClose?.();
    },
  });

  useEffect(() => {
    if (isOpenProp) {
      dropdownRef?.current?.focus();
    }
  }, [isOpenProp]);

  return {
    dropdownRef,
    isOpen,
    descendants,
    onClose,
  };
};
