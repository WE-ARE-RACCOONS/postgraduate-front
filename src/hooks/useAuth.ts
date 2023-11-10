import { accessTokenAtom } from "@/stores/user";
import { SetTokenProps } from "@/types/user/user";
import { useSetAtom } from "jotai";
import { useCookies } from "react-cookie";

function useAuth() {
  const [cookies, setCookie] = useCookies(['refresh_token']);
  const setAccessTkn = useSetAtom(accessTokenAtom);

  function setAccessToken(props: SetTokenProps) {
    // 만료시간 세팅하는 로직도 추가
    const expires = calculateExpires(props.expires);
    setAccessTkn(props.token);
  }
  
  function setRefreshToken(props: SetTokenProps) {
    const expires = calculateExpires(props.expires);
    setCookie('refresh_token', props.token, { path: '/', expires });
  }

  function calculateExpires(expires: number) {
    const now = new Date();
    const result = new Date(now.getTime() + expires * 1000);
    return result;
  }

  return {
    setAccessToken,
    setRefreshToken
  };
}

export default useAuth;