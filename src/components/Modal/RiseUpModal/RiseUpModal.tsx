import { TextField } from "@mui/material";
import { ModalBackground } from "./RiseUpModal.styled";

function RiseUpModal({ modalHandler } : { modalHandler: () => void }) {

  return(
    <ModalBackground onClick={modalHandler}>
      <div className='rise-up-modal'>
        <TextField />
      </div>
    </ModalBackground>
  )
}

export default RiseUpModal;