import { USER_TYPE } from '@/constants/user/cUser';
import { userTypeAtom } from '@/stores/signup';
import { accessExpireAtom, accessTokenAtom } from '@/stores/user';
import { SetTokenProps } from '@/types/user/user';
import axios from 'axios';
import { useAtom } from 'jotai';
import { useCookies } from 'react-cookie';

function useAuth() {
  const [cookies, setCookie, removeCookie] = useCookies(['refresh_token']);
  // const [accessTkn, setAccessTkn] = useAtom(accessTokenAtom);
  // const [accessExp, setAccessExp] = useAtom(accessExpireAtom);
  // const [type, setType] = useAtom(userTypeAtom);

  /** 초 단위 만료 시간 Date 객체로 반환 */
  function calculateExpires(expires: number) {
    const now = new Date();
    const result = new Date(now.getTime() + expires * 1000);
    return result;
  }

  /** localStorage에 access token 값 및 만료 시간 저장 */
  function setAccessToken(props: SetTokenProps) {
    const expires = calculateExpires(props.expires);
    localStorage.setItem('accessToken', props.token);
    localStorage.setItem('accessExpire', expires.toString());
  }

  /** cookie에 refresh token 값 및 만료 시간 저장 */
  function setRefreshToken(props: SetTokenProps) {
    const expires = calculateExpires(props.expires);
    setCookie('refresh_token', props.token, { path: '/', expires });
  }

  /** ADMIN | USER | SENIOR 값에 맞춰 user type 세팅 */
  function setUserType(serverType: string) {
    switch (serverType) {
      case USER_TYPE.admin:
        localStorage.setItem('userType', 'admin');
        break;
      case USER_TYPE.junior:
        localStorage.setItem('userType', 'junior');
        break;
      case USER_TYPE.senior:
        localStorage.setItem('userType', 'senior');
        break;
      default:
        break;
    }
  }

  /** access token 또는 재로그인 필요 여부 반환 */
  async function getAccessToken() {
    if (
      typeof window !== 'undefined' &&
      localStorage.hasOwnProperty('accessToken') &&
      localStorage.hasOwnProperty('accessExpire')
    ) {
      const accessTkn = localStorage.getItem('accessToken');
      const accessExp = new Date(localStorage.getItem('accessExpire')!);

      if (isExpired(accessExp)) {
        if (getRefreshToken()) {
          await reissueToken();
          const accessTkn = localStorage.getItem('accessToken');
          return accessTkn;
        } else {
          return '';
        }
      }

      if (!isExpired(accessExp)) return accessTkn;
    } else {
      if (getRefreshToken()) {
        await reissueToken();
        const accessTkn = localStorage.getItem('accessToken');
        return accessTkn;
      } else {
        return '';
      }
    }
  }

  /** refresh token 반환 */
  function getRefreshToken() {
    if (cookies.refresh_token) {
      return cookies.refresh_token;
    }
    return '';
  }

  /** user type 반환 */
  function getUserType() {
    if (
      typeof window !== undefined &&
      localStorage.hasOwnProperty('userType')
    ) {
      return localStorage.getItem('userType');
    } else {
      return '';
    }
  }

  /** 토큰 만료되었는지 검사하는 함수 */
  function isExpired(expires: Date) {
    const now = new Date();
    if (now > expires) return true;
    else return false;
  }

  /** 토큰 재발급 하는 함수 */
  async function reissueToken() {
    try {
      // axios
      //   .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh`, null, {
      //     headers: {
      //       Authorization: `Bearer ${getRefreshToken()}`,
      //     },
      //   })
      //   .then(async (res) => {
      //     const response = res.data;
      //     // code 값에 따라 세팅하는 조건문 추가
      //     if (response.code && response.code == 'AU201') {
      //       setAccessToken({
      //         token: response.data.accessToken,
      //         expires: response.data.accessExpiration,
      //       });
      //       setRefreshToken({
      //         token: response.data.refreshToken,
      //         expires: response.data.refreshExpiration,
      //       });
      //       setUserType(response.data.role);
      //     }
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //   });

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh`,
        null,
        {
          headers: {
            Authorization: `Bearer ${getRefreshToken()}`,
          },
        },
      );

      const res = response.data;

      if (res.code && res.code == 'AU201') {
        setAccessToken({
          token: response.data.accessToken,
          expires: response.data.accessExpiration,
        });
        setRefreshToken({
          token: response.data.refreshToken,
          expires: response.data.refreshExpiration,
        });
        setUserType(response.data.role);
        return;
      }

      if (res.errorCode && res.errorCode == 'EX202') {
        removeTokens();
        return;
      }
    } catch {}
  }

  /** 로그아웃 등 토큰 지우는 함수 */
  function removeTokens() {
    if (typeof window !== undefined) {
      if (localStorage.hasOwnProperty('accessToken')) {
        localStorage.removeItem('accessToken');
      }

      if (localStorage.hasOwnProperty('accessExpire')) {
        localStorage.removeItem('accessExpire');
      }

      if (localStorage.hasOwnProperty('userType')) {
        localStorage.removeItem('userType');
      }

      removeCookie('refresh_token', { path: '/' });
    }
  }

  return {
    setAccessToken,
    setRefreshToken,
    getAccessToken,
    getRefreshToken,
    setUserType,
    getUserType,
    removeTokens,
  };
}

export default useAuth;
