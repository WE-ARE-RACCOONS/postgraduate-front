'use client';
import MenuBar from '@/components/MenuBar';
import Login from '@/components/kakao/login';
import { SeverAccessProvider } from '@/context/SeverAccessProvider';
import { useEffect } from 'react';
import { savePrevPath } from '@/utils/prevPath';

export default function Home() {
  useEffect(() => {
    savePrevPath();
  }, []);

  return (
    <SeverAccessProvider>
      기본 루트 페이지 입니다
      <Login />
      <MenuBar />
    </SeverAccessProvider>
  );
}
