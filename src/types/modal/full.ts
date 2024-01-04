/** FullModal로 띄울 컨텐츠 새로 구현할 때마다 타입으로 추가 */
export type FullModalType =
  | 'best-case'
  | 'login-request'
  | 'senior-my-profile'
  | 'profile-modify'
  | 'accept-mentoring'
  | 'senior-info-modify'
  | 'senior-mentoring-time'
  | 'select-date-calendar';

export interface FullModalProps {
  modalType: FullModalType;
  modalHandler: () => void;
}
