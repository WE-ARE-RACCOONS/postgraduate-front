export type ModalType = 'postgradu' | 'major' | 'field' | 'keyword' | 'bank';

export interface RiseUpModalProps {
  modalHandler: () => void;
  modalType: ModalType;
}
