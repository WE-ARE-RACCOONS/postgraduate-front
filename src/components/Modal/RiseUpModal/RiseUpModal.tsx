import { RiseUpModalProps } from "@/types/modal/riseUp";
import { ModalBackground } from "./RiseUpModal.styled";
import SearchForm from "@/components/SingleForm/SearchForm";
import SelectForm from "@/components/SingleForm/SelectForm";

function RiseUpModal(props: RiseUpModalProps) {

  return(
    <ModalBackground onClick={props.modalHandler}>
      <div className='rise-up-modal' onClick={(e) => e.stopPropagation()}>
        {((props.modalType == 'postgradu') || (props.modalType == 'major')) && (
          <SearchForm clickHandler={props.modalHandler} formType={props.modalType} />
        )}
        {props.modalType == 'field' && (
          <SelectForm />
        )}
      </div>
    </ModalBackground>
  )
}

export default RiseUpModal;