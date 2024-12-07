import {
  SeniorManageContainer,
  SeniorManageContentContainer,
} from './SeniorManage.styled';
import { useUpdateRoleToJunior } from '@/hooks/mutations/useUpdateJunior';
import ContentComponent from '../../../ProfileStateChange/ContentBox';
import TitleComponent from '../../../ProfileStateChange/TitleBox';
import { SeniorManageProps } from '@/types/profile/seniorManage';

import Router, { useRouter } from 'next/navigation';

import useDimmedModal from '@/hooks/useDimmedModal';
import { usePostRenewUserToken } from '@/hooks/mutations/usePostRenewToken';

import {
  isTutorialFinished,
  socialIdAtom,
  userTypeAtom,
} from '@/stores/signup';
import { useAtom, useSetAtom } from 'jotai';

import useFullModal from '@/hooks/useFullModal';

function SeniorManage(props: SeniorManageProps) {
  const router = useRouter();

  const { mutate: updateSeniorRoleToJunior } = usePostRenewUserToken();
  const [_socialId, setSocialId] = useAtom(socialIdAtom);
  const setuserTypeAtom = useSetAtom(userTypeAtom);
  const setTutorialFinish = useSetAtom(isTutorialFinished);
  const { openModal: _openSeniorMyProfileModal } = useFullModal({
    modalType: 'senior-my-profile',
  });

  const { openModal: openSeniorInfoModifyModal } = useFullModal({
    modalType: 'senior-info-modify',
    bModalHandler: props.modalHandler,
  });

  const { openModal: openNotRegisteredModal } = useDimmedModal({
    modalType: 'notRegistered',
  });

  const { openModal: openNotJuniorModal } = useDimmedModal({
    modalType: 'notJunior',
  });

  const MyprofHandler = () => {
    if (checkRegister()) {
      router.push(`/senior/info/${props.seniorId}`);
    }
  };

  const MyAuth = () => {
    if (props.certifiReg === 'APPROVE' || props.certifiReg === 'WAITING') {
      props.AmodalHandler();
      return;
    }
    if (props.certifiReg === 'NOT_APPROVE' || props.certifiReg === 'NONE') {
      router.push(`/senior/auth`);
      return;
    }
  };

  const checkRegister = () => {
    if (props.profileReg) return true;
    if (!props.profileReg) {
      openNotRegisteredModal();
      return false;
    }
  };

  const changeJunior = async () => {
    updateSeniorRoleToJunior(undefined);
  };

  const editProf = () => {
    router.push('/senior/edit-profile');
  };

  return (
    <SeniorManageContainer>
      <SeniorManageContentContainer>
        <TitleComponent title="계정 관리" />
        <ContentComponent
          content="계정 설정"
          onClick={openSeniorInfoModifyModal}
        />
        <ContentComponent content="내 프로필 보기" onClick={MyprofHandler} />

        <ContentComponent
          kind="msg"
          profileReg={props.profileReg}
          content="내 프로필 수정"
          onClick={editProf}
        />
        <ContentComponent
          kind="auth"
          certifiReg={props.certifiReg}
          content="대학원 인증"
          onClick={MyAuth}
        />
        <ContentComponent
          onClick={() => router.push('/signout')}
          content="탈퇴하기"
        />
      </SeniorManageContentContainer>
      <SeniorManageContentContainer>
        <div style={{ marginTop: '1rem' }}></div>
        <TitleComponent title="회원 상태 변경" />
        <ContentComponent
          content="대학생 후배 회원으로 변경"
          onClick={changeJunior}
        />
      </SeniorManageContentContainer>
    </SeniorManageContainer>
  );
}

export default SeniorManage;
