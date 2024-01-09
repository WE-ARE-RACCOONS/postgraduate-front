export type btnKindClicked = 'out' | 'profileAdd' | 'modal' | 'click';

export interface ClickedBtnProps {
  clickHandler: () => void;
  btnText: string;
  kind: btnKindClicked;
}
