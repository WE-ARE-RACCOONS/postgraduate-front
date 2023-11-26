import { RiseUpModalProps } from "@/types/modal/riseUp";
import { ModalBackground } from "./RiseUpModal.styled";
import SearchForm from "@/components/SingleForm/SearchForm";

function RiseUpModal(props: RiseUpModalProps) {

  return(
    <ModalBackground onClick={props.modalHandler}>
      <div className='rise-up-modal' onClick={(e) => e.stopPropagation()}>
        {props.modalType == 'postgradu' && (
          <SearchForm clickHandler={props.modalHandler} formType={props.modalType} />
        ) }
      </div>
    </ModalBackground>
  )
}

export default RiseUpModal;