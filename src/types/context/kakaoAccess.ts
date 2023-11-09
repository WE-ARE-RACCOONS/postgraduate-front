import { ReactNode } from 'react';

export type KakaoAccessContextType = {
  kakaoAccess: string;
  setKakaoAccess: React.Dispatch<React.SetStateAction<string>>;
};

export interface KakaoAccessProviderProps {
  children: ReactNode;
}
