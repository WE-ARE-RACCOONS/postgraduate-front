import { FullModalProps } from '@/types/modal/full';
import { FullModalContainer } from './FullModal.styled';
import MBestCaseContent from '@/components/Content/MBestCaseContent';
import MyLoginRequest from '@/components/Content/MyLoginRequest/MyLoginRequest';
import SeniorMyProfile from '@/components/Content/SeniorMyProfile';
import ProfileModify from '@/components/Content/ProfileModify';
import SmentoringAccept from '@/components/Mentoring/SmentoringAccept/SmentoringAccept';
import SInfoModify from '@/components/Content/SInfoModify';
import AddTime from '@/components/Content/AddTime';
import SmentoringSpec from '@/components/Mentoring/MentoringSpec/SmentoringSpec/SmentoringSpec';
import SelectCalendar from '@/components/Content/SelectCalendar';
import { firAbleTimeAtom } from '@/stores/mentoring';
import MentoringSpec from '@/components/Mentoring/MentoringSpec/JmentoringSpec';
function FullModal(props: FullModalProps) {
  return (
    <>
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
        {props.modalType == 'junior-mentoring-spec' && (
          <MentoringSpec
            modalHandler={props.modalHandler}
            cancelModalHandler={
              props.cancelModalHandler ? props.cancelModalHandler : () => {}
            }
            mentoringId={props.mentoringId ? props.mentoringId : 0}
          />
        )}
        {props.modalType == 'profile-modify' && (
          <ProfileModify modalHandler={props.modalHandler} />
        )}
        {props.modalType == 'accept-mentoring' && (
          <SmentoringAccept modalHandler={props.modalHandler} />
        )}
        {props.modalType == 'senior-info-modify' && (
          <SInfoModify
            bModalHandler={props.bModalHandler ? props.bModalHandler : () => {}}
            modalHandler={props.modalHandler}
          />
        )}
        {props.modalType == 'senior-mentoring-time' && (
          <AddTime modalHandler={props.modalHandler} />
        )}
        {props.modalType == 'senior-mentoring-spec' && (
          <SmentoringSpec
            cancelModalHandler={
              props.cancelModalHandler ? props.cancelModalHandler : () => {}
            }
            modalHandler={props.modalHandler}
            acceptModalHandler={
              props.acceptModalHandler ? props.acceptModalHandler : () => {}
            }
            mentoringId={props.mentoringId ? props.mentoringId : 0}
          />
        )}
        {props.modalType == 'select-date-calendar' && (
          <SelectCalendar
            modalHandler={props.modalHandler}
            targetAtom={props.targetAtom || firAbleTimeAtom}
          />
        )}
      </FullModalContainer>
    </>
  );
}

export default FullModal;
