import { ClickedBtnProps } from '@/types/button/clickedBtn';
import {
  BtnAdd,
  BtnOut,
  BtnModal,
  BtnSave,
  BtnSaveNo,
} from './ClickedBtn.styled';
function ClickedBtn(props: ClickedBtnProps) {
  return (
    <div>
      {props.kind == 'out' && (
        <BtnOut onClick={props.clickHandler}>{props.btnText}</BtnOut>
      )}
      {props.kind == 'profileAdd' && (
        <BtnAdd onClick={props.clickHandler}>{props.btnText}</BtnAdd>
      )}
      {props.kind == 'modal' && (
        <BtnModal onClick={props.clickHandler}>{props.btnText}</BtnModal>
      )}
      {props.kind == 'click' && (
        <button onClick={props.clickHandler}>{props.btnText}</button>
      )}
      {props.kind == 'save' && (
        <BtnSave onClick={props.clickHandler}>{props.btnText}</BtnSave>
      )}
      {props.kind == 'save-non' && (
        <BtnSaveNo onClick={props.clickHandler}>{props.btnText}</BtnSaveNo>
      )}
    </div>
  );
}

export default ClickedBtn;
