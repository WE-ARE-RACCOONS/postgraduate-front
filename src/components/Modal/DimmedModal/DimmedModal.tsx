import { DimmedModalProps } from "@/types/modal/dimmed";
import { DimmedBgContainer, DimmedMdContainer } from "./DimmedModal.styled";
import MProfileContent from "@/components/Content/MProfileContent";

function DimmedModal(props: DimmedModalProps) {
  return(
    <DimmedBgContainer>
      <DimmedMdContainer>
        {(props.modalType == 'postgraduProfile') && (
          <MProfileContent modalHandler={props.modalHandler} />
        )}
      </DimmedMdContainer>
    </DimmedBgContainer>
  )
}

export default DimmedModal;