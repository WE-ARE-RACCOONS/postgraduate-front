import { SeniorManageAuthBox, SeniorManageContainer, SeniorManageContentContainer, SeniorManageAuthValue } from "./SeniorManage.styled";
import ContentComponent from '../../Box/ContentBox';
import TitleComponent from '../../Box/TitleBox';
import { SeniorManageProps } from "@/types/profile/seniorManage";
import { certiRegType } from "@/types/profile/profile";

function SeniorManage(props: SeniorManageProps) {

  function setAuthText(auth: certiRegType) {
    switch(auth) {
      case 'APPROVE':
        return '승인 완료';
      case 'NOT_APPROVE':
        return '미승인';
      case 'WAITING':
        return '승인 대기중';
      default:
        return '';
    }
  }

  return(
    <SeniorManageContainer>
      <SeniorManageContentContainer>
        <TitleComponent title="계정 설정" />
        <ContentComponent content="내 정보 수정" />
        <SeniorManageAuthBox>
          <button>내 프로필 보기</button>
          {!props.profileReg && (<SeniorManageAuthValue>미완성</SeniorManageAuthValue>)}
        </SeniorManageAuthBox>
        <ContentComponent content="내 프로필 수정" />
        <SeniorManageAuthBox>
          <button>대학원 인증</button>
          <SeniorManageAuthValue $certifiReg={props.certifiReg}>{setAuthText(props.certifiReg)}</SeniorManageAuthValue>
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