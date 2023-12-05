import { FullModalProps } from '@/types/modal/full';
import { FullModalContainer } from './FullModal.styled';
import MBestCaseContent from '@/components/Content/MBestCaseContent';
import MyLoginRequest from '@/components/Content/MyLoginRequest/MyLoginRequest';
import SeniorMyProfile from '@/components/Content/SeniorMyProfile';

function FullModal(props: FullModalProps) {
  return (
    <FullModalContainer>
      {props.modalType == 'best-case' && (
        <MBestCaseContent modalHandler={props.modalHandler} />
      )}
      {props.modalType == 'login-request' && (
        <MyLoginRequest modalHandler={props.modalHandler} />
      )}
      {props.modalType == 'senior-my-profile' && (
        <SeniorMyProfile />
      )}
    </FullModalContainer>
  );
}

export default FullModal;
