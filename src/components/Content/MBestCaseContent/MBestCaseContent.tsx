import { MBestCaseContainer } from "./MBestCaseContent.styled";
import Image from 'next/image';
import x_icon from '../../../../public/x.png';
import user_img from '../../../../public/user.png';
import RoundedImage from "@/components/Image/RoundedImage";
import DividedText from "@/components/Text/DividedText";

function MBestCaseContent({ modalHandler } : { modalHandler: () => void }) {
  return(
    <MBestCaseContainer>
      <Image
        id="x-icon"
        src={x_icon}
        alt="닫기 버튼"
        sizes="(max-width: 600px) 3.rem"
        priority
        onClick={modalHandler}
      />
      <RoundedImage imgSrc={user_img} altMsg="선배 프로필 이미지" />
      <DividedText firStr="대학원" secStr="학과" />
    </MBestCaseContainer>
  )
}

export default MBestCaseContent;