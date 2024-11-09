import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  ReactNode,
} from 'react';
import { useDescendats } from '@/hooks/useDescendant';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useOutSideClick } from '@/hooks/useOutsideClick';

interface DropdownContextType {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onToggle: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
  descendants: ReturnType<typeof useDescendats>;
}

const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined,
);

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error(
      'useDropdownContext must be used within a DropdownProvider',
    );
  }
  return context;
};

interface DropdownProviderProps {
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

export const DropdownProvider = ({
  isOpen: isOpenProp,
  onClose: onCloseProp,
  onOpen: onOpenProp,
  children,
}: DropdownProviderProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const descendants = useDescendats();

  const { onClose, isOpen, onOpen, onToggle } = useDisclosure({
    defaultIsOpen: isOpenProp,
    handleOpen: onOpenProp,
    handleClose: onCloseProp,
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
      dropdownRef.current?.focus();
    }
  }, [isOpenProp]);

  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        onOpen,
        onClose,
        onToggle,
        dropdownRef,
        descendants,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
};
