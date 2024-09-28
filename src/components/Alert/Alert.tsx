import { ReactNode } from 'react';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogOverlay,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';

export interface AlertPropsType {
  isOpen?: boolean;
  title: string;
  children: ReactNode | ReactNode[];
  buttonSlot: ReactNode | ReactNode[];
}

/**
 * Alert 공통컴포넌트
 * - RCC에서만 사용
 */
const Alert = (props: AlertPropsType) => {
  const { isOpen = false, title, children, buttonSlot } = props;

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogOverlay />
      <AlertDialogContent className="p-0 max-w-[22rem] rounded-lg">
        <AlertDialogHeader className="pt-9 px-4">
          <AlertDialogTitle className="text-center text-grayscale900 text-xl">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="hidden" />
        </AlertDialogHeader>
        <div className="px-4 pb-4 text-center">{children}</div>
        <AlertDialogFooter className="px-6 grid grid-cols-1 w-full pb-8">
          <div className="w-full flex justify-center items-center">
            {buttonSlot}
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Alert;
