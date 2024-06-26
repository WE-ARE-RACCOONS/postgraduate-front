import { certiRegType } from './profile';

export interface SeniorManageProps {
  certifiReg: certiRegType;
  profileReg: boolean;
  seniorId: number;
  modalHandler: () => void;
  AmodalHandler: () => void;
}
