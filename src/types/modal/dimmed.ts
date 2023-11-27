/** DimmedModal로 띄울 컨텐츠 새로 구현할 때마다 타입으로 추가 */
export type DimmedModalType = 'postgraduProfile';

export interface DimmedModalProps {
  modalType: DimmedModalType;
  modalHandler: () => void;
}