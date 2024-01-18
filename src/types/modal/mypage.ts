import { userType } from '../user/user';
export interface NotSeniorProps {
  modalHandler: () => void;
  userType?: userType;
}

export interface NotJuniorProps {
  modalHandler: () => void;
  userType?: userType;
}
