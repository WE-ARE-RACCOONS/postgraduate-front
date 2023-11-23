import { useRouter } from 'next/navigation';
import { MenuBox, MenuContainer } from './MenuBar.styled';
import { useAtomValue } from 'jotai';
import { userTypeAtom } from '@/stores/signup';

function MenuBar() {
  const router = useRouter();
  const userType = useAtomValue(userTypeAtom);

  const mentoringPath = userType === 'junior' ? '/junior/mentoring' : '/senior/mentoring';

  return (
    <MenuContainer>
      <MenuBox
        onClick={() => {
          router.push('/');
        }}
      >
        홈
      </MenuBox>
      <MenuBox
        onClick={() => router.push(mentoringPath)}
      >
        내 멘토링
      </MenuBox>
      <MenuBox
        onClick={() => {
          router.push('/mypage');
        }}
      >
        My
      </MenuBox>
    </MenuContainer>
  );
}

export default MenuBar;
