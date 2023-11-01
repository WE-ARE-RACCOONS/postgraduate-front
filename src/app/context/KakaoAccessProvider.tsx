'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'
import {
  KakaoAccessContextType,
  KakaoAccessProviderProps,
} from '../types/context/kakaoAccess'

const KakaoAccessContext = createContext<KakaoAccessContextType | null>(null)

export function KakaoAccessProvider({ children }: KakaoAccessProviderProps) {
  const [kakaoAccess, setKakaoAccess] = useState('')

  return (
    <KakaoAccessContext.Provider value={{ kakaoAccess, setKakaoAccess }}>
      {children}
    </KakaoAccessContext.Provider>
  )
}

export function useKakaoAccess() {
  const context = useContext(KakaoAccessContext)
  if (context === null) {
    throw new Error(
      'useKakaoAccess는 KakaoAccessProvider 내에서 사용되어야 합니다.',
    )
  }
  return context
}
