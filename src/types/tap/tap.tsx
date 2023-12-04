import { TAB, SFTAB, @/constants/tab/ctapstant/tab/ctap';

export type tapType =
  | typeof TAB.waiting
  | typeof TAB.expected
  | typeof TAB.done;

export type sftapType =
  | typeof SFTAB.AI
  | typeof SFTAB.CD
  | typeof SFTAB.BI
  | typeof SFTAB.AG
  | typeof SFTAB.OT;

export type smtapType =
  | typeof SMTAB.ALL
  | typeof SMTAB.SEO
  | typeof SMTAB.YEO
  | typeof SMTAB.OT;
