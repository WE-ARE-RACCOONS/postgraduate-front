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
}

export interface MentoringApplyProps {
  data: MentoringData | null;
}
