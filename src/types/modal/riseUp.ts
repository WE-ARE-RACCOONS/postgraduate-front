export type ModalType =
  | 'postgradu'
  | 'major'
  | 'field'
  | 'keyword'
  | 'bank'
  | 'wish-senior-apply';

export interface RiseUpModalProps {
  modalHandler: () => void;
  modalType: ModalType;
}
