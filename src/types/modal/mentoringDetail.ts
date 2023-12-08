export type ModalMentoringType = 'junior' | 'senior';

export interface ModalMentoringProps {
  modalHandler: () => void;
  cancelModalHandler?: () => void;
  mentoringId: number;
  onClick?: () => void;
}

export interface ModalMentoringclProps {
  cancelModalHandler: () => void;
  mentoringId: number;
  onClick?: () => void;
}
