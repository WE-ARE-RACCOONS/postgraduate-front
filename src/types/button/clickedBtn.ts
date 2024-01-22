export type btnKindClicked = 'out' | 'profileAdd' | 'modal' | 'click'|'save'|'save-non';

export interface ClickedBtnProps {
  clickHandler: () => void;
  btnText: string;
  kind: btnKindClicked;
}
