import { JuniorManageContainer } from './JuniorManage.styled';
import ContentComponent from '../../Box/ContentBox';
import TitleComponent from '../../Box/TitleBox';
import { useRouter } from 'next/navigation';

function JuniorManage() {
  const router = useRouter();
  const handleProfileEditClick = () => {
    router.push('/mypage/edit');
  };

  return (
    <JuniorManageContainer>
      <TitleComponent title="회원 상태 변경" />
      <ContentComponent
        content="내 정보 수정"
        onClick={handleProfileEditClick}
      />
      <ContentComponent content="대학원선배 회원으로 변경" />
    </JuniorManageContainer>
  );
}

export default JuniorManage;
