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
import DimmedModal from '@/components/Modal/DimmedModal';

function SeniorManage(props: SeniorManageProps) {
  const { modal, modalHandler, portalElement } = useModal(
    'senior-my-profile-portal',
  );
  const {
    modal: modifyModal,
    modalHandler: modifyHandler,
    portalElement: modifyPortal,
  } = useModal('profile-modify-portal');
  const {
    modal: infoModal,
    modalHandler: infoHandler,
    portalElement: infoPortal,
  } = useModal('senior-info-modify-portal');
  const {
    modal: registerModal,
    modalHandler: registerHandler,
    portalElement: registerPortal,
  } = useModal('senior-profile-not-registered');

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

  const checkRegister = () => {
    if (props.profileReg) return true;
    if (!props.profileReg) {
      registerHandler();
      return false;
    }
  };

  return (
    <SeniorManageContainer>
      <SeniorManageContentContainer>
        <TitleComponent title="계정 설정" />
        <ContentComponent content="계정 수정" onClick={infoHandler} />
        <SeniorManageAuthBox>
          <button
            onClick={() => {
              if (checkRegister()) modalHandler();
            }}
          >
            내 프로필 보기
          </button>
          {!props.profileReg && (
            <SeniorManageAuthValue>미완성</SeniorManageAuthValue>
          )}
        </SeniorManageAuthBox>
        <ContentComponent
          content="내 프로필 수정"
          onClick={() => {
            if (checkRegister()) modifyHandler();
          }}
        />
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
      {modifyModal && modifyPortal
        ? createPortal(
            <FullModal
              modalType="profile-modify"
              modalHandler={modifyHandler}
            />,
            modifyPortal,
          )
        : null}
      {infoModal && infoPortal
        ? createPortal(
            <FullModal
              modalType="senior-info-modify"
              modalHandler={infoHandler}
            />,
            infoPortal,
          )
        : null}
      {registerModal && registerPortal
        ? createPortal(
            <DimmedModal
              modalType="notRegistered"
              modalHandler={registerHandler}
            />,
            registerPortal,
          )
        : null}
    </SeniorManageContainer>
  );
}

export default SeniorManage;
