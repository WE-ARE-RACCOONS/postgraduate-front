'use client';
import { nickname } from "@/stores/nickname";
import { accessTokenAtom } from "@/stores/user";
import axios from "axios";
import { useAtomValue, useSetAtom } from "jotai";
import { useRouter, usePathname } from "next/navigation";

function SignUpBtn() {
  const currentPath = usePathname();
  const pathArr = currentPath.split('/');
  const socialId = pathArr[2];
  const nickName = useAtomValue(nickname);
  const router = useRouter();
  const setAccessToken = useSetAtom(accessTokenAtom);

  const handleSignUp = () => {
    if(socialId && nickName) {
      axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/signup`, {
        socialId,
        nickName
      }).then((res) => {
        const response = res.data;
        if(response.code == "AU202") {
          router.replace('/signup/done');
          setAccessToken(response.data.accessToken);
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