import { ShortRiseUpModalProps } from "@/types/modal/shortRiseUp";
import { ModalBackground } from "./ShortRiseUpModal.styled";
import PayAmount from "@/components/Content/PayAmount";

function ShortRiseUpModal(props: ShortRiseUpModalProps) {
  return(
    <ModalBackground onClick={props.modalHandler}>
      <div className="short-rise-up-modal" onClick={(e) => e.stopPropagation()}>
        {(props.modalType == 'payAmount') && (
          <PayAmount />
        )}
      </div>
    </ModalBackground>
  )
}

export default ShortRiseUpModal;