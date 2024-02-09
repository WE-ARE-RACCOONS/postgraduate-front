export interface SeniorProfileProps {
  data: SeniorProfileData;
}

export interface SeniorProfileData {
  profile: string;
  keyword: string[];
  lab: string;
  major: string;
  nickName: string;
  postgradu: string;
  seniorId: number;
}
