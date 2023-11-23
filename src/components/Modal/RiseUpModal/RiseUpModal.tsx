import { ModalBackground } from "./RiseUpModal.styled";

function RiseUpModal({ modalHandler } : { modalHandler: () => void }) {

  return(
    <ModalBackground onClick={modalHandler}>
      <div className='rise-up-modal'>Modal</div>
    </ModalBackground>
  )
}

export default RiseUpModal;