import { FullModalProps } from '@/types/modal/full';
import { FullModalContainer } from './FullModal.styled';
import MBestCaseContent from '@/components/Content/MBestCaseContent';
import MyLoginRequest from '@/components/Content/MyLoginRequest/MyLoginRequest';
import SmentoringAccept from '@/components/Mentoring/SmentoringAccept/SmentoringAccept';

function FullModal(props: FullModalProps) {
  return (
    <FullModalContainer>
      {props.modalType == 'best-case' && (
        <MBestCaseContent modalHandler={props.modalHandler} />
      )}
      {props.modalType == 'login-request' && (
        <MyLoginRequest modalHandler={props.modalHandler} />
      )}
      {props.modalType == 'accept-mentoring' && (
        <SmentoringAccept modalHandler={props.modalHandler} />
      )}
    </FullModalContainer>
  );
}

export default FullModal;
