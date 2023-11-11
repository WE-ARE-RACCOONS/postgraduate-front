'use client';
import Login from '@/components/kakao/login';
import { SeverAccessProvider } from '@/context/SeverAccessProvider';

export default function Home() {
  return (
    <SeverAccessProvider>
      기본 루트 페이지 입니다
      <Login />
    </SeverAccessProvider>
  );
}
