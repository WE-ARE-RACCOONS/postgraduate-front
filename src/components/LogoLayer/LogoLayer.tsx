import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '@/../../public/logo.png';
import search from '@/../../public/search.png';
import Login from '../kakao/login';
import { SearchModalProps } from '@/types/modal/search';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

function LogoLayer(props: SearchModalProps) {
  const [isLogin, setIsLogin] = useState(false);
  const { getAccessToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getAccessToken().then((accessTkn) => {
      if (accessTkn) setIsLogin(true);
    });
  }, []);

  const handleClick = () => {
    props.modalHandler();
  };

  const logoClick = () => {
    router.push('/');
  };

  return (
    <div className="flex h-16 items-center justify-between bg-white px-4">
      <div className="flex cursor-pointer" onClick={logoClick}>
        <Image
          id="logo"
          src={logo}
          alt="로고"
          width={36}
          height={24}
          priority
          className="mr-1"
        />
        <div className="text-lg">대학원</div>
        <div className="text-lg font-bold">김선배</div>
      </div>
      <div className="flex items-center">
        <Image
          id="search"
          src={search}
          alt="검색"
          sizes="(max-width: 600px) 2rem"
          priority
          onClick={handleClick}
          className="cursor-pointer"
        />
        {!isLogin && <Login />}
      </div>
    </div>
  );
}

export default LogoLayer;
