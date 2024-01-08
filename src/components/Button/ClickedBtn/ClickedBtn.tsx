import { ClickedBtnProps } from '@/types/button/clickedBtn';
import {BtnAdd,BtnOut,BtnModal} from './ClickedBtn.styled'
function ClickedBtn(props: ClickedBtnProps) {
  return(
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
</div>
  )
}

export default ClickedBtn;
