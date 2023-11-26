export type ModalType = 'postgradu' | 'major' | 'field' | 'keyword'

export interface RiseUpModalProps {
  modalHandler: () => void;
  modalType: ModalType;
}