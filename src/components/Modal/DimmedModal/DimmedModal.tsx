import { DimmedModalProps } from '@/types/modal/dimmed';
import { DimmedBgContainer, DimmedMdContainer } from './DimmedModal.styled';
import MProfileContent from '@/components/Content/MProfileContent';
import LoginRequest from '@/components/Content/LoginRequest/LoginRequest';

function DimmedModal(props: DimmedModalProps) {
  return (
    <DimmedBgContainer>
      <DimmedMdContainer>
        {props.modalType == 'postgraduProfile' && (
          <MProfileContent modalHandler={props.modalHandler} />
        )}
        {props.modalType == 'notuser' && (
          <LoginRequest modalHandler={props.modalHandler} />
        )}
      </DimmedMdContainer>
    </DimmedBgContainer>
  );
}

export default DimmedModal;
