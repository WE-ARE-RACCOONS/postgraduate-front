export interface MentoringData {
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
}

export interface MentoringApplyProps {
  data: MentoringData | null;
}

export interface KakaoOpenChatProps {
  url: string;
}

export interface MentoringSpecData {
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
}

export interface TextToggleButtonProps {
  text: string;
}