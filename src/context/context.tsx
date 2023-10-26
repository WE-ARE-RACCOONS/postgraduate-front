import { createContext, useContext, useState } from 'react';
import { ReactNode } from 'react';
import { useEffect } from 'react';

// const token = localStorage.getItem('token')
// console.log('로컬 스토리지 토큰',token)
// 새로운 Context 생성
const AccessTokenContext = createContext({
    accessToken: String,
    provideAccessToken: (string) => {},
  });

// 컨텍스트 프로바이더를 사용하여 상태를 관리할 컴포넌트 작성
export function AccessTokenProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState("");

  
  // accessToken을 제공
  const provideAccessToken = (token) => {
    setAccessToken(token);
  };

  useEffect(() => {
    console.log('context에 저장된 토큰', accessToken);
 }, [accessToken]);
 
  
  const value = {
    accessToken, 
    provideAccessToken,
  }; 

  return (
    <AccessTokenContext.Provider value={value}>
      {children}
    </AccessTokenContext.Provider>
  );
}

// 커스텀 훅 생성: 다른 컴포넌트에서 accessToken에 액세스하기 위한 편한 방법
export function useAccessToken() {
  const context = useContext(AccessTokenContext);
  if (!context) {
    throw new Error('useAccessToken must be used within an AccessTokenProvider');
  }
  if (context.accessToken) {
    console.log('토큰 있음',[context.accessToken]);
  }
  return context;
}
