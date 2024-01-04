import { userType } from '../user/user';

export interface TypeBtnProps {
  onTypeSelect?: () => void;
  iconText: string;
  typeDesc: string;
  typeDescS?: string;
  typeDescColor?: string;
  userType: userType;
  iconSrc?: string;
  iconAlt?: string;
}
