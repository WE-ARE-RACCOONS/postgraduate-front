import { accessExpireAtom, accessTokenAtom } from '@/stores/user';
import { SetTokenProps } from '@/types/user/user';
import axios from 'axios';
import { useAtom } from 'jotai';
import { useCookies } from 'react-cookie';

function useAuth() {
  const [cookies, setCookie] = useCookies(['refresh_token']);
  const [accessTkn, setAccessTkn] = useAtom(accessTokenAtom);
  const [accessExp, setAccessExp] = useAtom(accessExpireAtom);

  /** 초 단위 만료 시간 Date 객체로 반환 */
  function calculateExpires(expires: number) {
    const now = new Date();
    const result = new Date(now.getTime() + expires * 1000);
    return result;
  }

  /** Jotai에 access token 값 및 만료 시간 저장 */
  function setAccessToken(props: SetTokenProps) {
    const expires = calculateExpires(props.expires);
    setAccessTkn(props.token);
    setAccessExp(expires);
  }

  /** cookie에 refresh token 값 및 만료 시간 저장 */
  function setRefreshToken(props: SetTokenProps) {
    const expires = calculateExpires(props.expires);
    setCookie('refresh_token', props.token, { path: '/', expires });
  }

  /** access token 또는 재로그인 필요 여부 반환 */
  function getAccessToken() {
    if (accessTkn) {
      // access token 있을 때
      if (isExpired(accessExp)) {
        // 만료됨
        if (getRefreshToken()) {
          // refresh token 있을 때
          reissueToken();
          return accessTkn;
        }
        if (!getRefreshToken()) {
          // refresh token 없을 때
          return '';
        }
      }

      if (!isExpired(accessExp)) return accessTkn;
    }

    if (!accessTkn) {
      // access token 없을 때
      if (getRefreshToken()) {
        // refresh token 있을 때
        reissueToken();
        return accessTkn;
      }
      if (!getRefreshToken()) {
        // refresh token 없을 때
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

  /** 토큰 만료되었는지 검사하는 함수 */
  function isExpired(expires: Date) {
    const now = new Date();
    if (now > expires) return true;
    else return false;
  }

  /** 토큰 재발급 하는 함수 */
  function reissueToken() {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh`, null, {
        headers: {
          Authorization: `Bearer ${getRefreshToken()}`,
        },
      })
      .then((res) => {
        const response = res.data;
        // code 값에 따라 세팅하는 조건문 추가
        setAccessToken({
          token: response.data.accessToken,
          expires: response.data.accessExpiration,
        });
        setRefreshToken({
          token: response.data.refreshToken,
          expires: response.data.refreshExpiration,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return {
    setAccessToken,
    setRefreshToken,
    getAccessToken,
    getRefreshToken,
  };
}

export default useAuth;
