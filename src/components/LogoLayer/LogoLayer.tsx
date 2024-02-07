import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '@/../../public/logo.png';
import search from '@/../../public/search.png';
import { HomeTopLayer, Logo } from './LogoLayer.styled';
import useModal from '@/hooks/useModal';
import Login from '../kakao/login';
import { SearchModalProps } from '@/types/modal/search';
import useAuth from '@/hooks/useAuth';
import Router from 'next/navigation';
import { useRouter } from 'next/navigation';
function LogoLayer(props: SearchModalProps) {
  const [isLogin, setIsLogin] = useState(false);
  const { getAccessToken } = useAuth();
  const router = useRouter();
  useEffect(() => {
    const accessTkn = getAccessToken();

    if (accessTkn) {
      setIsLogin(true);
    }
  }, []);
  const handleClick = () => {
    props.modalHandler();
  };
  const logoClick = () => {
    router.push('/');
  };
  return (
    <HomeTopLayer>
      <Logo>
        <Image
          id="logo"
          src={logo}
          alt="로고"
          width={36}
          height={24}
          priority
          onClick={logoClick}
          style={{ marginRight: '0.13rem', cursor: 'pointer' }}
        />
        <div className="none-name">대학원</div>
        <div className="bold-name">김선배</div>
      </Logo>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Image
          id="search"
          src={search}
          alt="검색"
          sizes="(max-width: 600px) 2.rem"
          priority
          onClick={handleClick}
        />
        {!isLogin && <Login />}
      </div>
    </HomeTopLayer>
  );
}

export default LogoLayer;
