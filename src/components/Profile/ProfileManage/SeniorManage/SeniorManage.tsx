import { SeniorManageAuthBox, SeniorManageContainer, SeniorManageContentContainer, SeniorManageAuthValue } from "./SeniorManage.styled";
import ContentComponent from '../../Box/ContentBox';
import TitleComponent from '../../Box/TitleBox';

function SeniorManage() {
  return(
    <SeniorManageContainer>
      <SeniorManageContentContainer>
        <TitleComponent title="프로필 관리" />
        <ContentComponent content="내 프로필 보기" />
        <ContentComponent content="내 프로필 수정" />
        <SeniorManageAuthBox>
          <button>대학원 인증</button>
          <SeniorManageAuthValue>승인완료</SeniorManageAuthValue>
        </SeniorManageAuthBox>
      </SeniorManageContentContainer>
      <SeniorManageContentContainer>
        <TitleComponent title="회원 상태 변경" />
        <ContentComponent content="후배 회원으로 상태 변경" />
      </SeniorManageContentContainer>
    </SeniorManageContainer>
  )
}

export default SeniorManage;