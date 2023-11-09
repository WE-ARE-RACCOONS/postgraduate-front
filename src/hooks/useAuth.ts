import { accessTokenAtom } from "@/stores/user";
import { SetTokenProps } from "@/types/user/user";
import { useSetAtom } from "jotai";
import { useCookies } from "react-cookie";

function useAuth() {
  const [cookies, setCookie] = useCookies(['refresh_token']);
  const setAccessTkn = useSetAtom(accessTokenAtom);

  function setAccessToken(props: SetTokenProps) {
    // 만료시간 세팅하는 로직도 추가
    setAccessTkn(props.token);
  }
  
  function setRefreshToken(props: SetTokenProps) {
    const now = new Date();
    const expires = new Date(now.getTime() + props.expires * 1000);
    setCookie('refresh_token', props.token, { path: '/', expires });
  }

  return {
    setAccessToken,
    setRefreshToken
  };
}

export default useAuth;