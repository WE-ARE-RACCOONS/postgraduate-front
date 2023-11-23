'use client';
import MenuBar from '@/components/MenuBar';
import Login from '@/components/kakao/login';
import { SeverAccessProvider } from '@/context/SeverAccessProvider';
import { prevPathAtom } from '@/stores/signup';
import { useSetAtom } from 'jotai';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const setPrevPath = useSetAtom(prevPathAtom);
  const currentPath = usePathname();
  const router = useRouter();

  const myMentoring = () => {
    router.push('/junior/mentoring');
  };

  useEffect(() => {
    setPrevPath(currentPath);
  }, []);

  return (
    <SeverAccessProvider>
      기본 루트 페이지 입니다 대학원 내멘토링
      <button onClick={myMentoring}></button>
      <Login />
      <MenuBar />
    </SeverAccessProvider>
  );
}
