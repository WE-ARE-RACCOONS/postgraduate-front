import { useRouter } from 'next/navigation';
import { MenuBox, MenuContainer,MenuWord } from './MenuBar.styled';
import { useAtomValue } from 'jotai';
import { userTypeAtom } from '@/stores/signup';
import { MenubarProps } from '@/types/modal/menubar';
import useAuth from '@/hooks/useAuth';
import Image from 'next/image';
import home from '../../../../public/home.png'
import mentor from '@/../../public/mentor.png'
import my from '@/../../public/my.png'
function MenuBar(props: MenubarProps) {
  const router = useRouter();
  const { getAccessToken, getUserType } = useAuth();
  const Token = getAccessToken();
  const userType = getUserType();
  const handleClick = () => {
    props.modalHandler();
    if (props.modalHandler) {
      props.modalHandler;
    }
  };

  const mentoringPath =
    userType === 'junior' ? '/junior/mentoring' : '/senior/mentoring';

  return (
    <MenuContainer>
      <MenuBox
        onClick={() => {
          router.push('/');
        }}
      >
      <Image
          id="home"
          src={home}
          alt="home icon"
          sizes="(max-width: 600px) 3.rem"
          priority
          style={{
            width: '1.5rem',
            height: '1.5rem'
          }}
        />
        <MenuWord>홈</MenuWord>
      </MenuBox>
      {Token ? (
        <MenuBox
          onClick={() => {
            router.push(mentoringPath);
          }}
        >
        <Image
          id="mentor"
          src={mentor}
          alt="mentor icon"
          sizes="(max-width: 600px) 3.rem"
          priority
          style={{
            width: '1.5rem',
            height: '1.5rem'
          }}
        />
        <MenuWord>내 멘토링</MenuWord>
        </MenuBox>
      ) : (
        <MenuBox
          onClick={() => {
            handleClick();
          }}
        >
          <Image
          id="mentor"
          src={mentor}
          alt="mentor icon"
          sizes="(max-width: 600px) 3.rem"
          priority
          style={{
            width: '1.5rem',
            height: '1.5rem'
          }}
        />
        </MenuBox>
      )}
      <MenuBox
        onClick={() => {
          router.push('/mypage');
        }}
      >
        <Image
          id="my"
          src={my}
          alt="my icon"
          sizes="(max-width: 600px) 3.rem"
          priority
          style={{
            width: '1.5rem',
            height: '1.5rem'
          }}
        />
        <MenuWord>마이페이지</MenuWord>
      </MenuBox>
    </MenuContainer>
  );
}

export default MenuBar;
