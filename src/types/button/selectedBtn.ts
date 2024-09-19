export interface SelectedBtnProps {
  btnText: string;
  selected: Array<string>;
  selectHandler: (newSelectedString: string[]) => void;
}
