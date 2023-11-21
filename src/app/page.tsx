'use client';
import MenuBar from '@/components/MenuBar';
import Login from '@/components/kakao/login';
import { SeverAccessProvider } from '@/context/SeverAccessProvider';
import { useEffect } from 'react';
import usePrevPath from '@/hooks/usePrevPath';

export default function Home() {
  const { setCurrentPath } = usePrevPath();

  useEffect(() => {
    setCurrentPath();
  }, []);

  return (
    <SeverAccessProvider>
      기본 루트 페이지 입니다
      <Login />
      <MenuBar />
    </SeverAccessProvider>
  );
}
