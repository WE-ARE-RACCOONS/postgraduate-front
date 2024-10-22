import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { useSetAtom } from 'jotai';
import { socialIdAtom, isTutorialFinished } from '@/stores/signup';
import { overlay } from 'overlay-kit';
import {
  KakaoAuthFetchResponse,
  kakaoAuthFetch,
} from '@/api/auth/login/kakaoAuthFetch';
import { rejoinPatchFetch } from '@/api/auth/rejoin/rejoinPatchFetch';
import FullModal from '@/components/Modal/FullModal';
import findExCode from '@/utils/findExCode';

const useKakaoLogin = () => {
  const setSocialId = useSetAtom(socialIdAtom);
  const setTutorialFinished = useSetAtom(isTutorialFinished);
  const router = useRouter();
  const { setAccessToken, setRefreshToken, setUserType } = useAuth();

  const setUserContext = (userRes: KakaoAuthFetchResponse) => {
    const {
      accessExpiration,
      accessToken,
      refreshToken,
      role,
      isTutorial,
      refreshExpiration,
      socialId,
    } = userRes?.data;

    setAccessToken({ token: accessToken, expires: accessExpiration });
    setRefreshToken({ token: refreshToken, expires: refreshExpiration });
    setUserType(role);
    setTutorialFinished(isTutorial);
    setSocialId(socialId);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    const fetchKakaoData = async () => {
      try {
        const { data: kakaoAuthFetchRes } = await kakaoAuthFetch({
          code: code ?? '',
        });

        const { socialId, isDelete } = kakaoAuthFetchRes.data;

        if (kakaoAuthFetchRes.code === 'AU204') {
          setUserContext(kakaoAuthFetchRes);
          router.push('/');
          return;
        }

        if (findExCode(kakaoAuthFetchRes.code)) {
          alert('탈퇴 후 15일에서 30일 사이에는 로그인이 불가능합니다.');
          router.push('/');
          return;
        }

        if (isDelete) {
          const agreeActivateAccount = await overlay.openAsync<boolean>(
            ({ close, unmount }) => (
              <FullModal
                modalType="account-reactive"
                modalHandler={async () => {
                  const res = await rejoinPatchFetch({
                    socialId,
                    rejoin: true,
                  }).then((res) => {
                    if (res.data.code === 'EX300') {
                      router.push('/');
                    }
                    setUserContext(res.data);
                    router.push('/');
                    unmount();
                  });
                }}
                cancelModalHandler={async () => {
                  await rejoinPatchFetch({ socialId, rejoin: false }).then(
                    () => {
                      close(false);
                      unmount();
                    },
                  );
                }}
              />
            ),
          );
          if (!agreeActivateAccount) {
            router.push('/');
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchKakaoData();
  }, []);
};

export default useKakaoLogin;
