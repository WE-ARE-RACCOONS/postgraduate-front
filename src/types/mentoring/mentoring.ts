export interface MentoringData {
  status: boolean;
  remainTime: string;
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
  salaryDate: string;
}

export interface MentoringApplyProps {
  data: MentoringData | MentoringSpecData | null;
}

export interface KakaoOpenChatProps {
  url: string;
}

export interface MentoringSpecData {
  status: boolean;
  remainTime: string;
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
  salaryDate: string;
}

export interface TextToggleButtonProps {
  text: string;
}
