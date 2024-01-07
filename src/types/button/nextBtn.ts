export type btnKind = 'next' | 'route' | 'prev';

export interface NextBtnProps {
  kind: btnKind;
  url?: string;
  btnText: string;
  onClick?: () => void;
}
