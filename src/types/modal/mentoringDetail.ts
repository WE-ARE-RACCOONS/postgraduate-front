export type ModalMentoringType = 'junior' | 'senior';

export interface ModalMentoringProps {
  modalHandler: () => void;
  cancelModalHandler?: () => void;
  acceptModalHandler?:() => void;
  mentoringId: number;
  onClick?: () => void;
}
export interface ModalMentoringSProps {
  modalHandler: () => void;
  cancelModalHandler: () => void;
  acceptModalHandler:() => void;
  mentoringId: number;
  onClick?: () => void;
}

export interface ModalMentoringclProps {
  cancelModalHandler: () => void;
  mentoringId: number;
  onClick?: () => void;
}
