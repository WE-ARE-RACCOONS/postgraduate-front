export interface SelectedBtnProps {
  btnText: string;
  selected: Array<string>;
  selectHandler: React.Dispatch<React.SetStateAction<Array<string>>>;
}
