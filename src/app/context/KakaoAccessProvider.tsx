"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface KakaoAccessContextType {
  kakaoAccess: string;
  setKakaoAccess: React.Dispatch<React.SetStateAction<string>>;
}

const KakaoAccessContext = createContext<KakaoAccessContextType | null>(null);

interface KakaoAccessProviderProps {
  children: ReactNode;
}

export function KakaoAccessProvider({ children }: KakaoAccessProviderProps) {
  const [kakaoAccess, setKakaoAccess] = useState('');

  return (
    <KakaoAccessContext.Provider value={{ kakaoAccess, setKakaoAccess }}>
      {children}
    </KakaoAccessContext.Provider>
  );
}

export function useKakaoAccess() {
  const context = useContext(KakaoAccessContext);
  if (context === null) {
    throw new Error('useKakaoAccess must be used within a KakaoAccessProvider');
  }
  return context;
}