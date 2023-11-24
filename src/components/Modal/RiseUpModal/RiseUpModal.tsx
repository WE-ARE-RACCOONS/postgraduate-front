import { TextField } from "@mui/material";
import { ModalBackground, TextFieldWrapper } from "./RiseUpModal.styled";

function RiseUpModal({ modalHandler } : { modalHandler: () => void }) {

  return(
    <ModalBackground onClick={modalHandler}>
      <div className='rise-up-modal' onClick={(e) => e.stopPropagation()}>
        <TextFieldWrapper>
          <TextField id="outlined-basic" label="대학원명" variant="outlined" size="small" style = {{width: '18.5rem'}} />
        </TextFieldWrapper>
      </div>
    </ModalBackground>
  )
}

export default RiseUpModal;