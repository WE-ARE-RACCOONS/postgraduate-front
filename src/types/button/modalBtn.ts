export interface ModalBtnProps {
  btnText: string;
  type?: string;
  modalHandler: () => void;
  cancelModalHandler?: () => void;
  onClick?: () => void;
}
