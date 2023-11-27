import x_icon from '../../../../public/x.png';
import Image from 'next/image'
import NextBtn from "@/components/Button/NextBtn";
import { MProfileContainer } from './MProfileContent.styled';

function MProfileContent() {
  return(
    <MProfileContainer>
      <div>프로필을 작성하지 않으면<br />멘토링을 진행할 수 없어요</div>
      <Image id="x-icon" src={x_icon} alt="닫기 버튼" />
      <NextBtn kind="route" url="/add-profile" btnText="프로필 등록하기" />
    </MProfileContainer>
  )
}

export default MProfileContent;