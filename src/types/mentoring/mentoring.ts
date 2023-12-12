export interface MentoringData {
  remainTime:number;
  seniorId: number;
  profile: string;
  nickName: string;
  postgradu: string;
  major: string;
  lab: string;
  topic: string;
  question: string;
  dates: string[];
  term: number;
  date: string;
  chatLink: string;
  mentoringId: number;
salaryDate:number;
}

export interface MentoringApplyProps {
  data: MentoringData | MentoringSpecData | null;
}

export interface KakaoOpenChatProps {
  url: string;
}

export interface MentoringSpecData {
  remainTime:number;
  dates: string[];
  lab: string;
  major: string;
  nickName: string;
  postgradu: string;
  profile: string;
  question: string;
  seniorId: number;
  topic: string;
  term: string;
  chatLink: string;
  date: string;
  salaryDate:number;
}

export interface TextToggleButtonProps {
  text: string;
}
