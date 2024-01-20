export type btnKind = 'next' | 'route' | 'prev'|'route-non';

export interface NextBtnProps {
  kind: btnKind;
  url?: string;
  btnText: string;
  onClick?: () => void;
}
