export type btnKind = 'next' | 'route' | 'prev' | 'route-non'|'route-non-matching';

export interface NextBtnProps {
  kind: btnKind;
  url?: string;
  btnText: string;
  onClick?: () => void;
}
