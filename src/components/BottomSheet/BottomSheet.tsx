'use client';

import { useLayoutEffect, ReactNode } from 'react';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
} from '@/components/ui/drawer';

export interface BottomSheetPropsType {
  title: string;
  children?: ReactNode | ReactNode[];
  isOpen: boolean;
  onClose: () => void;
}

const BottomSheet = (props: BottomSheetPropsType) => {
  const { isOpen, onClose, children, title } = props;

  useLayoutEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement;

    body.style.setProperty('position', 'relative');

    return () => {
      body.style.removeProperty('position');
    };
  }, []);

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      preventScrollRestoration={true}
      modal={true}
      noBodyStyles={true}
    >
      <DrawerOverlay onClick={onClose} />

      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="mt-2 flex justify-between items-center">
            <DrawerTitle className="font-medium text-xl">{title}</DrawerTitle>
            <DrawerDescription />
            <DrawerClose asChild>
              <Button variant="ghost" className="px-2" onClick={onClose}>
                <X size={16} />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <div className="p-4 pb-0">{children}</div>
          <DrawerFooter></DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default BottomSheet;
