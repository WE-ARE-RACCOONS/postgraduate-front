import { createContext, useContext, useState } from 'react';
import { ReactNode } from 'react';
import { useEffect } from 'react';

const AccessTokenContext = createContext({
    accessToken: String,
    provideAccessToken: (string) => {},
  });


export function AccessTokenProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState("");


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

export function useAccessToken() {
  const context = useContext(AccessTokenContext);
  if (!context) {
    throw new Error('useAccessToken must be used within an AccessTokenProvider');
  }
  if (context.accessToken) {
    console.log('토큰을 가지고 있음',[context.accessToken]);
  }
  return context;
}
