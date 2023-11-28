export interface CancleBtnProps {
    btnText: string;
    mentoringId:number;
    cancelModalHandler: () => void;
    modalHandler:() => void;
    onClick?: () => void;
  }