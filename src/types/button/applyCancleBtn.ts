export type btnKindClicked = 'spec' | 'jcancel';
export interface CancleBtnProps {
  btnText: string;
  mentoringId: number;
  cancelModalHandler?: () => void;
  modalHandler: () => void;
  onClick?: () => void;
  kind?: btnKindClicked;
}
