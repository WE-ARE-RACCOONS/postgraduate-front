import { FullModalProps } from '@/types/modal/full';
import { FullModalContainer } from './FullModal.styled';
import MBestCaseContent from '@/components/Content/MBestCaseContent';
import MyLoginRequest from '@/components/Content/MyLoginRequest/MyLoginRequest';
import SeniorMyProfile from '@/components/Content/SeniorMyProfile';
import ProfileModify from '@/components/Content/ProfileModify';
import SmentoringAccept from '@/components/Mentoring/SmentoringAccept/SmentoringAccept';
import SInfoModify from '@/components/Content/SInfoModify';

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
        <SeniorMyProfile modalHandler={props.modalHandler} />
      )}
      {props.modalType == 'profile-modify' && (
        <ProfileModify modalHandler={props.modalHandler} />
      )}
      {props.modalType == 'accept-mentoring' && (
        <SmentoringAccept modalHandler={props.modalHandler} />
      )}
      {props.modalType == 'senior-info-modify' && (
        <SInfoModify modalHandler={props.modalHandler} />
      )}
    </FullModalContainer>
  );
}

export default FullModal;
