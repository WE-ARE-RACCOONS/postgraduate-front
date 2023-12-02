import { useRouter } from 'next/navigation';
import { MenuBox, MenuContainer } from './MenuBar.styled';
import { useAtomValue } from 'jotai';
import { userTypeAtom } from '@/stores/signup';
import { MenubarProps } from '@/types/modal/menubar';
import useAuth from '@/hooks/useAuth';

function MenuBar(props: MenubarProps) {
  const router = useRouter();
  const userType = useAtomValue(userTypeAtom);
  const { getAccessToken } = useAuth();
  const Token = getAccessToken();
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
        홈
      </MenuBox>
      {Token ? (
        <MenuBox onClick={() => router.push(mentoringPath)}>내 멘토링</MenuBox>
      ) : (
        <MenuBox
          onClick={() => {
            handleClick();
          }}
        >
          내 멘토링
        </MenuBox>
      )}
      <MenuBox
        onClick={() => {
          handleClick();
        }}
      >
        My
      </MenuBox>
    </MenuContainer>
  );
}

export default MenuBar;
