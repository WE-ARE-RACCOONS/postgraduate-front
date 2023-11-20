export type btnKind = 'next' | 'route';

export interface NextBtnProps {
  kind: btnKind;
  url: string;
  btnText: string;
}
