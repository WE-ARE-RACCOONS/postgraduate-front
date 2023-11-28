import { ClickedBtnProps } from '@/types/button/clickedBtn';

function ClickedBtn(props: ClickedBtnProps) {
  return <button onClick={props.clickHandler}>{props.btnText}</button>;
}

export default ClickedBtn;
