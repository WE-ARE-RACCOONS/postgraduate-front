import NextBtn from "@/components/Button/NextBtn";
import { DimmedBgContainer, DimmedMdContainer } from "./DimmedModal.styled";

function DimmedModal() {
  return(
    <DimmedBgContainer>
      <DimmedMdContainer>
        <div>프로필을 작성하지 않으면<br />멘토링을 진행할 수 없어요</div>
        <NextBtn kind="route" url="/add-profile" btnText="프로필 등록하기" />
      </DimmedMdContainer>
    </DimmedBgContainer>
  )
}

export default DimmedModal;