import { useRouter } from 'next/navigation';
import { MenuBox, MenuContainer } from './MenuBar.styled';

function MenuBar() {
  const router = useRouter();

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
        onClick={() => {
          router.push('/my-mentoring');
        }}
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
