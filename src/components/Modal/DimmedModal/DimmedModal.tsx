import { DimmedBgContainer, DimmedMdContainer } from "./DimmedModal.styled";
import MProfileContent from "@/components/Content/MProfileContent";

function DimmedModal() {
  return(
    <DimmedBgContainer>
      <DimmedMdContainer>
        <MProfileContent />
      </DimmedMdContainer>
    </DimmedBgContainer>
  )
}

export default DimmedModal;