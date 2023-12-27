import { BackHeaderContainer } from "./BackHeader.styled";
import Image from "next/image";
import back_arrow from '../../../../public/arrow.png';
import { useRouter } from "next/navigation";

function BackHeader({ headerText } : { headerText: string }) {
  const router = useRouter();

  return(
    <BackHeaderContainer>
      <Image id="back-arrow-img" src={back_arrow} alt="뒤로가기 화살표" onClick={() => {router.back()}} />
      <div id="header-text">{headerText}</div>
    </BackHeaderContainer>
  )
}

export default BackHeader;