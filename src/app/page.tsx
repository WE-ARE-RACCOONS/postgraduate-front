'use client';
import MenuBar from '@/components/Bar/MenuBar';
import Login from '@/components/kakao/login';
import { useEffect } from 'react';
import usePrevPath from '@/hooks/usePrevPath';

export default function Home() {
  const { setCurrentPath } = usePrevPath();

  useEffect(() => {
    setCurrentPath();
  }, []);

  return (
    <div>
      기본 루트 페이지 입니다
      <Login />
      <MenuBar />
    </div>
  );
}
