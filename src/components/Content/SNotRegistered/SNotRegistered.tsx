import {
  PNRBtn,
  PNRContainer,
  PNRDesc,
  PNRTitle,
} from './SNotRegistered.styled';
import Image from 'next/image';
import x_icon from '../../../../public/x.png';
import { PROFILE_NOT_REGISTERED } from '@/constants/modal/dimmedModal';
import { useRouter } from 'next/navigation';

function SNotRegistered({ modalHandler }: { modalHandler: () => void }) {
  const router = useRouter();

  return (
    <PNRContainer>
      <Image id="x-icon" src={x_icon} alt="X 버튼" onClick={modalHandler} />
      <PNRTitle>{PROFILE_NOT_REGISTERED.title}</PNRTitle>
      <PNRDesc>{PROFILE_NOT_REGISTERED.desc}</PNRDesc>
      <PNRBtn
        onClick={() => {
          router.push('/add-profile');
        }}
      >
        {PROFILE_NOT_REGISTERED.btnText}
      </PNRBtn>
    </PNRContainer>
  );
}

export default SNotRegistered;
