import { userType } from '../user/user';

export type certiRegType = 'NOT_APPROVE' | 'WAITING' | 'APPROVE';

export interface ProfileProps {
  profile: string;
  nickName: string;
  userType: userType;
  profileReg: boolean; // only senior
  certifiReg: certiRegType;
  modalHandler: () => void;
   // only senior
}

export interface ProfileManageProps {
  modalHandler: () => void;
  userType: userType;
  certifiReg: certiRegType; // only senior
  profileReg: boolean; // only senior
}
