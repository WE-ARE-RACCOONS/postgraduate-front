import { PrimitiveAtom } from 'jotai';

/** FullModal로 띄울 컨텐츠 새로 구현할 때마다 타입으로 추가 */
export type FullModalType =
  | 'best-case'
  | 'login-request'
  | 'senior-my-profile'
  | 'profile-modify'
  | 'accept-mentoring'
  | 'senior-info-modify'
  | 'senior-mentoring-time'
  | 'senior-mentoring-spec'
  | 'select-date-calendar'

export interface FullModalProps {
  modalType: FullModalType;
  modalHandler: () => void;
  cancelModalHandler?: () => void;
  acceptModalHandler?: () => void;
  mentoringId?: number;
  targetAtom?: PrimitiveAtom<string>; // 'select-date-calendar'의 경우에만 추가

}
