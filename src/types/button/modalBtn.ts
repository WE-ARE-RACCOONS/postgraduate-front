export interface ModalBtnProps {
  isGet?:boolean;
  btnText: string;
  type?: string;
  modalHandler: () => void;
  cancelModalHandler?: () => void;
  onClick?: () => void;
}
