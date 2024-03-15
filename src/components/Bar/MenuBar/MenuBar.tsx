import { usePathname, useRouter } from 'next/navigation';
import { MenuBox, MenuContainer, MenuWord } from './MenuBar.styled';
import { useAtom, useAtomValue } from 'jotai';
import { userTypeAtom } from '@/stores/signup';
import { MenubarProps } from '@/types/modal/menubar';
import useAuth from '@/hooks/useAuth';
import Image from 'next/image';
import home from '../../../../public/home.png';
import mentor from '@/../../public/mentor.png';
import mentorA from '@/../../public/mentoring-act.png';
import homeA from '@/../../public/home-act.png';
import my from '@/../../public/my.png';
import myA from '@/../../public/mypage-act.png';
import { useEffect, useState } from 'react';
import { menuBarAtom } from '@/stores/home';
function MenuBar(props: MenubarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { getAccessToken, getUserType } = useAuth();
  const [userType, setUserType] = useState('');
  const [token, setToken] = useState('');
  const [activeMenu, setActiveMenu] = useAtom(menuBarAtom);
  // const userType = getUserType();

  useEffect(() => {
    const userT = getUserType();
    if (userT) setUserType(userT);
    getAccessToken().then((accessTkn) => {
      if (accessTkn) setToken(accessTkn);
    });
    if (pathname === '/') {
      setActiveMenu('home');
    } else if (pathname === '/junior/mentoring' || '/senior/mentoring') {
      setActiveMenu('mentoring');
    } else if (pathname === '/mypage') {
      setActiveMenu('mypage');
    }
  }, []);

  const handleClick = () => {
    if (props.modalHandler) props.modalHandler();
  };

  const mentoringPath =
    userType === 'junior' ? '/junior/mentoring' : '/senior/mentoring';

  return (
    <MenuContainer>
      <MenuBox
        onClick={() => {
          setActiveMenu('home');
          router.push('/');
        }}
      >
        {activeMenu === 'home' ? (
          <Image
            id="home"
            src={homeA}
            alt="home icon"
            sizes="(max-width: 600px) 3.rem"
            priority
            style={{
              width: '1.5rem',
              height: '1.5rem',
            }}
          />
        ) : (
          <Image
            id="home"
            src={home}
            alt="home icon"
            sizes="(max-width: 600px) 3.rem"
            priority
            style={{
              width: '1.5rem',
              height: '1.5rem',
            }}
          />
        )}
        <MenuWord>홈</MenuWord>
      </MenuBox>
      {token ? (
        <MenuBox
          onClick={() => {
            setActiveMenu('mentoring');
            router.push(mentoringPath);
          }}
        >
          {activeMenu === 'mentoring' ? (
            <Image
              id="mentor"
              src={mentorA}
              alt="mentor icon"
              sizes="(max-width: 600px) 3.rem"
              priority
              style={{
                width: '1.5rem',
                height: '1.5rem',
              }}
            />
          ) : (
            <Image
              id="mentor"
              src={mentor}
              alt="mentor icon"
              sizes="(max-width: 600px) 3.rem"
              priority
              style={{
                width: '1.5rem',
                height: '1.5rem',
              }}
            />
          )}
          <MenuWord>내 멘토링</MenuWord>
        </MenuBox>
      ) : (
        <MenuBox
          onClick={() => {
            setActiveMenu('mentoring');
            handleClick();
          }}
        >
          {activeMenu === 'mentoring' ? (
            <Image
              id="mentor"
              src={mentorA}
              alt="mentor icon"
              sizes="(max-width: 600px) 3.rem"
              priority
              style={{
                width: '1.5rem',
                height: '1.5rem',
              }}
            />
          ) : (
            <Image
              id="mentor"
              src={mentor}
              alt="mentor icon"
              sizes="(max-width: 600px) 3.rem"
              priority
              style={{
                width: '1.5rem',
                height: '1.5rem',
              }}
            />
          )}
          <MenuWord>내 멘토링</MenuWord>
        </MenuBox>
      )}
      <MenuBox
        onClick={() => {
          router.push('/mypage');
          setActiveMenu('mypage');
        }}
      >
        {activeMenu === 'mypage' ? (
          <Image
            id="my"
            src={myA}
            alt="my icon"
            sizes="(max-width: 600px) 3.rem"
            priority
            style={{
              width: '1.5rem',
              height: '1.5rem',
            }}
          />
        ) : (
          <Image
            id="my"
            src={my}
            alt="my icon"
            sizes="(max-width: 600px) 3.rem"
            priority
            style={{
              width: '1.5rem',
              height: '1.5rem',
            }}
          />
        )}
        <MenuWord>마이페이지</MenuWord>
      </MenuBox>
    </MenuContainer>
  );
}

export default MenuBar;
