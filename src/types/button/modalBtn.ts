export interface ModalBtnProps {
  btnText: string;
  modalHandler: () => void;
  cancelModalHandler?: () => void;
  onClick?: () => void;
}

