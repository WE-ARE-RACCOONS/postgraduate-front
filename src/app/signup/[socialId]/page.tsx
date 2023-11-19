'use client';
import TypeBtn from "@/components/Button/TypeBtn";
import { useRouter, usePathname } from "next/navigation";

function SignUpPage() {
  const router = useRouter();
  const currentPath = usePathname();

  return (
    <div>
      <h3>회원 유형 선택</h3>
      <div>
        가입하시려는 회원의 유형을 선택해주세요. <br />
        한쪽을 선택해도, 이후 마이페이지에서 전환 가능해요.
      </div>
      <div>
        <TypeBtn iconText="후배 아이콘" typeDesc={`멘토링을 받는\n후배 회원가입`} userType="junior" />
        <TypeBtn iconText="선배 아이콘" typeDesc={`멘토링을 진행하는\n대학원 선배 회원가입`} userType="senior" />
      </div>
      <button onClick={() => {router.push(currentPath + '/common-info')}}>다음으로</button>
    </div>
  );
}

export default SignUpPage;
