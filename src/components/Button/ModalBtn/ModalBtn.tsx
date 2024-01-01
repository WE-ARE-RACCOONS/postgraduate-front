import { ModalBtnProps } from '@/types/button/modalBtn';
import { StyledModalBtn, StyledSModalBtn } from './ModalBtn.styled';

function ModalBtn(props: ModalBtnProps) {
  const handleClick = () => {
    props.modalHandler();
    if (props.cancelModalHandler) {
      props.cancelModalHandler();
    }
    if (props.onClick) props.onClick();
  };

  return (
    <>
      {props.type === 'show' && (
        <StyledSModalBtn
          onClick={() => {
            handleClick();
          }}
        >
          {props.btnText}
        </StyledSModalBtn>
      )}
    </>
  );
}

export default ModalBtn;
