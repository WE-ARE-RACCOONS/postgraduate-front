export interface SelectedBtnProps {
  btnText: string;
  selected: Array<string>;
  selectHandler: (_newSelectedString: string[]) => void;
}
