import FullModal from '@/components/Modal/FullModal';
import { FullModalProps } from '@/types/modal/full';
import { overlay } from 'overlay-kit';
import { useState } from 'react';

interface UseFullModalProps extends FullModalProps {
  overlayId?: string;
}
const useFullModal = ({ ...props }: UseFullModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    overlay.open(
      ({ unmount }) => {
        return (
          <FullModal
            {...props}
            modalType={props.modalType}
            modalHandler={() => {
              if (props.modalHandler) {
                props.modalHandler();
              }
              closeModal(unmount);
            }}
            cancelModalHandler={() => {
              if (props.cancelModalHandler) {
                props.cancelModalHandler();
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

export default useFullModal;
