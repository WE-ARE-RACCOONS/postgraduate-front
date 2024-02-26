import React, { useEffect, useState } from 'react';
import TitleComponent from '../Box/TitleBox/TitleBox';
import ContentComponent from '../Box/ContentBox/ContentBox';
import { CustomerCenterBox } from './CustomerCenter.styled';
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import { useRouter } from 'next/navigation';
function CustomerCenter() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const { getAccessToken, removeTokens } = useAuth();

  useEffect(() => {
    getAccessToken().then(accessTkn => {
      if (accessTkn) setIsLogin(true);
    });
  }, []);

  const logout = () => {
    getAccessToken().then((accessTkn) => {
      if (accessTkn) {
        axios
          .post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`,
            {},
            {
              headers: {
                Authorization: `Bearer ${accessTkn}`,
              },
            },
          )
          .then((response) => {
            const res = response.data;
  
            if (res.code == 'AU203') {
              removeTokens();
              router.replace('/');
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  };

  return (
    <CustomerCenterBox>
      <TitleComponent title="고객센터"></TitleComponent>
      <ContentComponent content="문의하기"></ContentComponent>
      {isLogin && (
        <ContentComponent
          content="로그아웃"
          onClick={logout}
        ></ContentComponent>
      )}
    </CustomerCenterBox>
  );
}

export default CustomerCenter;
