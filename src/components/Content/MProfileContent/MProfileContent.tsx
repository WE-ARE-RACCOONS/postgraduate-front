import x_icon from '../../../../public/x.png';
import Image from 'next/image'
import { MProfileContainer } from './MProfileContent.styled';
import ConfirmBtn from '@/components/Button/ConfirmBtn';
import { MProfileContentProps } from '@/types/content/mProfileContent';
import { useRouter } from 'next/navigation';

function MProfileContent(props: MProfileContentProps) {
  const router = useRouter();

  const handleClick = () => {
    props.modalHandler();
    router.push('/add-profile');
  }

  return(
    <MProfileContainer>
      <div id='profile-guide-msg'>프로필을 작성하지 않으면<br />멘토링을 진행할 수 없어요</div>
      <Image id="x-icon" src={x_icon} alt="닫기 버튼" sizes='(max-width: 600px) 3.rem' priority />
      <div id='btn-styled-wrapper'>
        {/* <NextBtn kind="route" url="/add-profile" btnText="프로필 등록하기" /> */}
        <ConfirmBtn clickHandler={handleClick} />
      </div>
    </MProfileContainer>
  )
}

export default MProfileContent;