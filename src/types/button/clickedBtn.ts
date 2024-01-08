export type btnKindClicked = 'out' | 'profileAdd' | 'modal';

export interface ClickedBtnProps {
  clickHandler: () => void;
  btnText: string;
  kind: btnKindClicked;
}
