export type ModalMentoringType = 'junior' | 'senior';


export interface ModalMentoringProps {
    modalHandler: () => void;
    mentoringId: number;
    onClick?: () => void;
  }