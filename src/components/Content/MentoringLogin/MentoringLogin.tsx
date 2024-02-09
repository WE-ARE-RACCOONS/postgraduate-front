import { MENTORING_APPLY_LOGIN } from '@/constants/modal/dimmedModal';
import { MLBtn, MLContainer, MLDesc, MLTitle } from './MentoringLogin.styled';
import Image from 'next/image';
import x_img from '../../../../public/x_gray.png';
const REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;

function MentoringLogin({ modalHandler }: { modalHandler: () => void }) {
  const handleClick = () => {
    modalHandler();
    if (typeof window !== undefined) {
      if (window.location.hostname.includes('localhost')) {
        const REDIRECT_URI = process.env.NEXT_PUBLIC_LOCAL_REDIRECT_URI;
        const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
        window.location.href = link;
      } else {
        const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
        const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
        window.location.href = link;
      }
    } else {
      const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
      const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
      window.location.href = link;
    }
  };

  return (
    <MLContainer>
      <Image id="x-btn" src={x_img} alt="X 버튼" onClick={modalHandler} />
      <MLTitle>{MENTORING_APPLY_LOGIN.title}</MLTitle>
      <MLDesc>{MENTORING_APPLY_LOGIN.desc}</MLDesc>
      <MLBtn onClick={handleClick}>{MENTORING_APPLY_LOGIN.btnText}</MLBtn>
    </MLContainer>
  );
}

export default MentoringLogin;
