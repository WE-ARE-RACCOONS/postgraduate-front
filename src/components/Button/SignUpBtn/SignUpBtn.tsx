'use client';
import useAuth from "@/hooks/useAuth";
import { nickname } from "@/stores/nickname";
import axios from "axios";
import { useAtomValue } from "jotai";
import { useRouter, usePathname } from "next/navigation";

function SignUpBtn() {
  const currentPath = usePathname();
  const pathArr = currentPath.split('/');
  const socialId = pathArr[2];
  const nickName = useAtomValue(nickname);
  const router = useRouter();
  const { setAccessToken, setRefreshToken } = useAuth();

  const handleSignUp = () => {
    if(socialId && nickName) {
      axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/signup`, {
        socialId,
        nickName
      }).then((res) => {
        const response = res.data;
        if(response.code == "AU202") {
          setAccessToken({ token: response.data.accessToken, expires: response.data.accessExpiration });
          setRefreshToken({ token: response.data.refreshToken, expires: response.data.refreshExpiration });
          router.replace('/signup/done');
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  return (
    <button onClick={handleSignUp}>가입하기</button>
  )
}

export default SignUpBtn;