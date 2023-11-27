import x_icon from '../../../../public/x.png';
import Image from 'next/image'
import { MProfileContainer } from './MProfileContent.styled';
import ClickedBtn from '@/components/Button/ClickedBtn';
import { MProfileContentProps } from '@/types/content/mProfileContent';
import { useRouter } from 'next/navigation';

function MProfileContent(props: MProfileContentProps) {
  const router = useRouter();

  const handleClick = () => {
    props.modalHandler();
    router.push('/add-profile');
  }

  const xClick = () => {
    props.modalHandler();
    /** 대학원 선배 마이페이지로 이동(라우팅 어떻게 될지 모르겠어서 일단 임시 url...) */
    router.push('/mypage');
  }

  return(
    <MProfileContainer>
      <div id='profile-guide-msg'>프로필을 작성하지 않으면<br />멘토링을 진행할 수 없어요</div>
      <Image id="x-icon" src={x_icon} alt="닫기 버튼" sizes='(max-width: 600px) 3.rem' priority onClick={xClick} />
      <div id='btn-styled-wrapper'>
        <ClickedBtn clickHandler={handleClick} btnText='프로필 등록하기' />
      </div>
    </MProfileContainer>
  )
}

export default MProfileContent;