import { ModalBackground } from "./RiseUpModal.styled";
import SearchForm from "@/components/SingleForm/SearchForm";

function RiseUpModal({ modalHandler } : { modalHandler: () => void }) {

  return(
    <ModalBackground onClick={modalHandler}>
      <div className='rise-up-modal' onClick={(e) => e.stopPropagation()}>
        <SearchForm />
      </div>
    </ModalBackground>
  )
}

export default RiseUpModal;