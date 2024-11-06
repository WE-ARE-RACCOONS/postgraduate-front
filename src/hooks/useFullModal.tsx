import FullModal from '@/components/Modal/FullModal';
import { FullModalProps } from '@/types/modal/full';
import { overlay } from 'overlay-kit';

import { useState, useEffect } from 'react';

interface UseFullModalProps extends FullModalProps {
  overlayId?: string;
}
const useFullModal = ({ ...props }: Partial<UseFullModalProps>) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    window.addEventListener('popstate', () => {
      overlay.unmountAll();
    });
  }, []);

  const openModalAsync = async () => {
    setIsOpen(true);
    overlay.openAsync(
      async ({ unmount }) => {
        return (
          <FullModal
            {...props}
            modalType={props?.modalType ?? 'best-case'}
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
  const openModal = () => {
    setIsOpen(true);

    overlay.open(
      ({ unmount }) => {
        return (
          <FullModal
            {...props}
            modalType={props?.modalType ?? 'best-case'}
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

  return { openModal, closeModal, toggleModal, isOpen, openModalAsync };
};

export default useFullModal;
