/** FullModal로 띄울 컨텐츠 새로 구현할 때마다 타입으로 추가 */
export type FullModalType = 'best-case' | 'login-request' | 'accept-mentoring';

export interface FullModalProps {
  modalType: FullModalType;
  modalHandler: () => void;
}
