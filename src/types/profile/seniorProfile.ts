export interface SeniorProfileProps {
  data: SeniorProfileData;
  className?: string;
}

export interface SeniorProfileData {
  profile: string;
  keyword: string[];
  lab: string;
  major: string;
  nickName: string;
  postgradu: string;
  professor: string;
  seniorId: number;
  certification: boolean;
}

export interface ProfileAuthProps {
  str: string;
  certification?: boolean;
}
