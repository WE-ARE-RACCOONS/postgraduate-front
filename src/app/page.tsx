'use client';
import Login from '@/components/kakao/login';
import { SeverAccessProvider } from '@/context/SeverAccessProvider';
import { useRouter } from 'next/navigation';
export default function Home() {
  const router = useRouter();
  
  const handleButtonClick = () => {
    router.push('/mypage');
  };

  return (

    <SeverAccessProvider>
      기본 루트 페이지 입니다
      <Login />
      <button onClick={handleButtonClick}>dlkfnsdldf</button>
    </SeverAccessProvider>
  );
}
