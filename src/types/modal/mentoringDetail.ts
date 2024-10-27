export type ModalMentoringType = 'junior' | 'senior';

export interface ModalMentoringProps {
  modalHandler: () => void;
  cancelModalHandler?: () => void;
  acceptModalHandler?: () => void;
  successHandler?: () => void;
  mentoringId: number;
  onClick?: () => void;
}
export interface ModalMentoringSProps {
  modalHandler: () => void;
  cancelModalHandler: () => void;
  acceptModalHandler: () => void;
  mentoringId: number | undefined;
  onClick?: () => void;
}

export interface ModalMentoringclProps {
  modalHandler: () => void;
  mentoringId: number;
  onClick?: () => void;
}
