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
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import { userType } from '@/types/user/user';
import Router from 'next/navigation';
import { useRouter } from 'next/router';
import { userTypeAtom } from '@/stores/signup';
import { useAtom, useSetAtom } from 'jotai';
function SeniorManage(props: SeniorManageProps) {
  const { modal, modalHandler, portalElement } = useModal(
    'senior-my-profile-portal',
  );
  const router = useRouter();
  const setuserTypeAtom = useSetAtom(userTypeAtom);
  const {
    modal: modifyModal,
    modalHandler: modifyHandler,
    portalElement: modifyPortal,
  } = useModal('profile-modify-portal');
  const {
    modal: setJModal,
    modalHandler: juniorHandler,
    portalElement: juniorPortal,
  } = useModal('junior-request-portal');
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
  const MyprofHandler = () => {
    if (checkRegister()) modalHandler();
  };

  const checkRegister = () => {
    if (props.profileReg) return true;
    if (!props.profileReg) {
      registerHandler();
      return false;
    }
  }; 
  const changeJunior = async () => {
    try {
      const { getAccessToken } = useAuth();
      const Token = getAccessToken();
      if (Token) {
        const headers = {
          Authorization: `Bearer ${Token}`,
        };
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/senior/me/role`,
          { headers },
        );
        console.log(response.data.data.possible)
        if (response.data.data.possible === true) {
          setuserTypeAtom('junior');
          router.push('/mypage')
        }
        if (response.data.data.possible === false) {
          juniorHandler();
        }
      }
    } catch (error) {
      console.error('Error fetching data from the server:', error);
    }
  };

  return (
    <SeniorManageContainer>
      <SeniorManageContentContainer>
        <TitleComponent title="계정 관리" />
        <ContentComponent content="계정 설정" onClick={infoHandler} />
        <ContentComponent content="내 프로필 보기" onClick={MyprofHandler} />
        <ContentComponent
          kind="msg"
          profileReg={props.profileReg}
          content="내 프로필 수정"
          onClick={infoHandler}
        />
        <ContentComponent
          kind="auth"
          certifiReg={props.certifiReg}
          content="대학원 인증"
          onClick={MyprofHandler}
        />
      </SeniorManageContentContainer>
      <SeniorManageContentContainer>
        <div style={{ marginTop: '1rem' }}></div>
        <TitleComponent title="회원 상태 변경" />
        <ContentComponent content="대학생 후배 회원으로 변경" onClick={changeJunior} />
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
        {setJModal && juniorPortal
        ? createPortal(
            <DimmedModal
              modalType="notJunior"
              modalHandler={registerHandler}
            />,
            juniorPortal,
          )
        : null}
    </SeniorManageContainer>
  );
}

export default SeniorManage;
