import { CJBtn, CJContainer, CJDesc, CJTitle } from './ChangeJunior.styled';
import Image from 'next/image';
import x_img from '../../../../public/x_gray.png';
import { MENTORING_APPLY_USER_TYPE } from '@/constants/modal/dimmedModal';
import { useRouter } from 'next/navigation';

function ChangeJunior({ modalHandler }: { modalHandler: () => void }) {
  const router = useRouter();

  const handleClick = () => {
    router.push('/mypage');
    modalHandler();
  };

  return (
    <CJContainer>
      <Image id="x-btn" src={x_img} alt="X 버튼" onClick={modalHandler} />
      <CJTitle>{MENTORING_APPLY_USER_TYPE.title}</CJTitle>
      <CJDesc>{MENTORING_APPLY_USER_TYPE.desc}</CJDesc>
      <CJBtn onClick={handleClick}>{MENTORING_APPLY_USER_TYPE.btnText}</CJBtn>
    </CJContainer>
  );
}

export default ChangeJunior;
