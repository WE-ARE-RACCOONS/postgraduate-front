import {
  SeniorManageAuthBox,
  SeniorManageContainer,
  SeniorManageContentContainer,
  SeniorManageAuthValue,
} from './SeniorManage.styled';
import ContentComponent from '../../Box/ContentBox';
import TitleComponent from '../../Box/TitleBox';
import { SeniorManageProps } from '@/types/profile/seniorManage';
import { certiRegType } from '@/types/profile/profile';
import useModal from '@/hooks/useModal';
import { createPortal } from 'react-dom';
import FullModal from '@/components/Modal/FullModal';

function SeniorManage(props: SeniorManageProps) {
  const { modal, modalHandler, portalElement } = useModal(
    'senior-my-profile-portal',
  );
  const { modal: modifyModal, modalHandler: modifyHandler, portalElement: modifyPortal } = useModal('profile-modify-portal');

  function setAuthText(auth: certiRegType) {
    switch (auth) {
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

  return (
    <SeniorManageContainer>
      <SeniorManageContentContainer>
        <TitleComponent title="계정 설정" />
        <ContentComponent content="내 정보 수정" />
        <SeniorManageAuthBox>
          <button onClick={modalHandler}>내 프로필 보기</button>
          {!props.profileReg && (
            <SeniorManageAuthValue>미완성</SeniorManageAuthValue>
          )}
        </SeniorManageAuthBox>
        <ContentComponent content="내 프로필 수정" onClick={modifyHandler} />
        <SeniorManageAuthBox>
          <button>대학원 인증</button>
          <SeniorManageAuthValue $certifiReg={props.certifiReg}>
            {setAuthText(props.certifiReg)}
          </SeniorManageAuthValue>
        </SeniorManageAuthBox>
      </SeniorManageContentContainer>
      <SeniorManageContentContainer>
        <TitleComponent title="회원 상태 변경" />
        <ContentComponent content="후배 회원으로 상태 변경" />
      </SeniorManageContentContainer>
      {modal && portalElement
        ? createPortal(
            <FullModal
              modalType="senior-my-profile"
              modalHandler={modalHandler}
            />,
            portalElement,
          )
        : null}
      {modifyModal && modifyPortal ? 
      createPortal(<FullModal modalType='profile-modify' modalHandler={modifyHandler} />, modifyPortal) : null}
    </SeniorManageContainer>
  );
}

export default SeniorManage;
