import { userType } from "../user/user";

export interface ProfileProps {
  profile: string;
  nickName: string;
  userType: userType;
}