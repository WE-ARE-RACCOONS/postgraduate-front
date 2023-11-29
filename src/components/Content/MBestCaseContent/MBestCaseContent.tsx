import { MBestCaseContainer } from "./MBestCaseContent.styled";
import Image from 'next/image';
import x_icon from '../../../../public/x.png';

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
    </MBestCaseContainer>
  )
}

export default MBestCaseContent;