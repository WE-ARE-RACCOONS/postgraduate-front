import { userType } from "../user/user";

export type certiRegType = 'NOT_APPROVE' | 'WAITING' | 'APPROVE';

export interface ProfileProps {
  profile: string;
  nickName: string;
  userType: userType;
  profileReg: boolean; // only senior
  certifiReg: certiRegType; // only senior
}

export interface ProfileManageProps {
  userType: userType;
  certifiReg: certiRegType; // only senior
  profileReg: boolean; // only senior
}