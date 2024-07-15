import { MENTORING_NOT_YET } from '@/constants/mentoring/my';
import { MentoringNotYetContainer } from './MentoringNotYet.styled';
import Image from 'next/image';
import logo from '../../../public/logo.png';
import { useRouter } from 'next/navigation';

function MentoringNotYet() {
  const router = useRouter();

  return (
    <MentoringNotYetContainer>
      <Image id="logo-img" src={logo} alt="대학원 김선배 로고 이미지" />
      <p>{MENTORING_NOT_YET.msg}</p>
      <button
        onClick={() => {
          router.push('/');
        }}
      >
        {MENTORING_NOT_YET.btnText}
      </button>
    </MentoringNotYetContainer>
  );
}

export default MentoringNotYet;
