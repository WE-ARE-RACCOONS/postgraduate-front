export type ModalType = 'payAmount';

export interface ShortRiseUpModalProps {
  modalHandler: () => void;
  modalType: ModalType;
}
