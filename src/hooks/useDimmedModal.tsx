import DimmedModal from '@/components/Modal/DimmedModal';

import { DimmedModalProps } from '@/types/modal/dimmed';
import { overlay } from 'overlay-kit';
import { useState } from 'react';

interface UseDimmedModalProps extends DimmedModalProps {
  overlayId?: string;
}
const useDimmedModal = ({ ...props }: Partial<UseDimmedModalProps>) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    overlay.open(
      ({ unmount }) => {
        return (
          <DimmedModal
            {...props}
            modalType={props?.modalType as DimmedModalProps['modalType']}
            modalHandler={() => {
              if (props.modalHandler) {
                props.modalHandler();
              }
              closeModal(unmount);
            }}
          />
        );
      },
      {
        overlayId: props.overlayId ?? '',
      },
    );
  };

  const closeModal = (unmount: () => void) => {
    setIsOpen(false);
    unmount();
  };

  const toggleModal = () => {
    if (isOpen) {
      closeModal(() => {});
    } else {
      openModal();
    }
  };

  return { openModal, closeModal, toggleModal, isOpen };
};

export default useDimmedModal;
