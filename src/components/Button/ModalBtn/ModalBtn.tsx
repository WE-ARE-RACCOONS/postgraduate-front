import { ModalBtnProps } from '@/types/button/modalBtn';
import { StyledModalBtn, StyledSModalBtn, SInfoBtn,StyledMSBtn } from './ModalBtn.styled';

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
      {props.type === 'seniorShow' && (
        <StyledMSBtn
          onClick={() => {
            handleClick();
          }}
        >
          {props.btnText}
        </StyledMSBtn>
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
      {props.type === 'bankInfo' && (
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
