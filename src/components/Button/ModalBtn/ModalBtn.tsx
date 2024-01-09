import { ModalBtnProps } from '@/types/button/modalBtn';
import { StyledModalBtn, StyledSModalBtn, SInfoBtn } from './ModalBtn.styled';

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
      {props.type === 'seniorInfo' && (
        <SInfoBtn
          isGet={props.isGet}
          onClick={() => {
            handleClick();
          }}
        >
          {props.btnText}
        </SInfoBtn>
      )}
    </>
  );
}

export default ModalBtn;
