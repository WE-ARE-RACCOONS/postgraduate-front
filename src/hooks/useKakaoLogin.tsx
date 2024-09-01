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
    } = userRes.data;

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
          router.replace('/');
          return;
        }

        if (isDelete) {
          const agreeActivateAccount = await overlay.openAsync<boolean>(
            ({ close, unmount }) => (
              <div>
                <button
                  onClick={async () => {
                    const res = await rejoinPatchFetch({
                      socialId,
                      rejoin: true,
                    });
                    setUserContext(res.data);
                  }}
                >
                  네
                </button>
                <button
                  onClick={async () => {
                    await rejoinPatchFetch({ socialId, rejoin: false });
                    close(false);
                    unmount();
                  }}
                >
                  아니오
                </button>
              </div>
            ),
          );
          if (!agreeActivateAccount) {
            router.push('/signup/select');
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
