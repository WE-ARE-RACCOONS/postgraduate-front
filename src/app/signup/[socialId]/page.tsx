'use client';
import { useRouter, usePathname } from "next/navigation";

function SignUpPage() {
  const router = useRouter();
  const currentPath = usePathname();

  return (
    <div>
      <div>회원 유형 선택</div>
      <button onClick={() => {router.push(currentPath + '/common-info')}}>다음으로</button>
    </div>
  );
}

export default SignUpPage;
