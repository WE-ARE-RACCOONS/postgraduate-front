import {
  SeniorManageContainer,
  SeniorManageContentContainer,
} from './SeniorManage.styled';
import ContentComponent from '../../Box/ContentBox';
import TitleComponent from '../../Box/TitleBox';
import { SeniorManageProps } from '@/types/profile/seniorManage';

import Router, { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import useDimmedModal from '@/hooks/useDimmedModal';
import axios from 'axios';
import {
  isTutorialFinished,
  socialIdAtom,
  userTypeAtom,
} from '@/stores/signup';
import { useAtom, useSetAtom } from 'jotai';
import findExCode from '@/utils/findExCode';
import useFullModal from '@/hooks/useFullModal';
import DimmedModal from '@/components/Modal/DimmedModal';
function SeniorManage(props: SeniorManageProps) {
  const router = useRouter();
  const setTutorialStatus = useSetAtom(isTutorialFinished);
  const {
    getAccessToken,
    setUserType,
    setAccessToken,
    setRefreshToken,
    removeTokens,
  } = useAuth();

  const [socialId, setSocialId] = useAtom(socialIdAtom);
  const setuserTypeAtom = useSetAtom(userTypeAtom);

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
    try {
      getAccessToken().then(async (Token) => {
        if (Token) {
          const headers = {
            Authorization: `Bearer ${Token}`,
          };
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/senior/me/role`,
            { headers },
          );

          if (findExCode(response.data.code)) {
            removeTokens();
            location.reload();
            return;
          }

          if (response.data.data.possible == true) {
            setuserTypeAtom('junior');
            renewJuniorToken();
          }

          if (response.data.data.possible == false) {
            setSocialId(response.data.data.socialId);
            openNotJuniorModal();
          }
        }
      });
    } catch (error) {
      console.error('Error fetching data from the server:', error);
    }
  };

  const renewJuniorToken = () => {
    getAccessToken().then((accessTkn) => {
      if (accessTkn) {
        axios
          .post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/token`,
            {},
            {
              headers: {
                Authorization: `Bearer ${accessTkn}`,
              },
            },
          )
          .then((response) => {
            const res = response.data;

            if (findExCode(res.code)) {
              removeTokens();
              location.reload();
              return;
            }

            if (res.code == 'AU202') {
              setAccessToken({
                token: res.data.accessToken,
                expires: res.data.accessExpiration,
              });
              setRefreshToken({
                token: res.data.refreshToken,
                expires: res.data.refreshExpiration,
              });
              setUserType(res.data.role);
              setTutorialStatus(res.data.isTutorial);

              router.replace('/');
              return;
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
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
