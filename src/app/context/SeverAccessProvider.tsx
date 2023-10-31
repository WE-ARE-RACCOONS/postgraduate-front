"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SeverAccessContextType, SeverAccessProviderProps } from '../types/context/severAccess';

const SeverAccessContext = createContext<SeverAccessContextType | null>(null);

export function SeverAccessProvider({ children }: SeverAccessProviderProps) {
  const [severAccess, setSeverAccess] = useState('');

  return (
    <SeverAccessContext.Provider value={{ severAccess, setSeverAccess }}>
      {children}
    </SeverAccessContext.Provider>
  );
}

export function useSeverAccess() {
  const context = useContext(SeverAccessContext);
  if (context === null) {
    throw new Error('useKakaoAccess는 KakaoAccessProvider 내에서 사용되어야 합니다.');
  }
  return context;
}