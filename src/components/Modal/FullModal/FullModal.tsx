import { FullModalProps } from '@/types/modal/full';
import { FullModalContainer } from './FullModal.styled';
import MBestCaseContent from '@/components/Content/MBestCaseContent';
import LoginRequest from '@/components/Content/LoginRequest/LoginRequest';
import SeniorMyProfile from '@/components/Content/SeniorMyProfile';
import ProfileModify from '@/components/Content/ProfileModify';
import SmentoringAccept from '@/components/Mentoring/SmentoringAccept/SmentoringAccept';
import SInfoModify from '@/components/Content/SInfoModify';
import AddTime from '@/components/Content/AddTime';
import SmentoringSpec from '@/components/Mentoring/MentoringSpec/SmentoringSpec/SmentoringSpec';
import SelectCalendar from '@/components/Content/SelectCalendar';
import { firAbleTimeAtom } from '@/stores/mentoring';
import MentoringSpec from '@/components/Mentoring/MentoringSpec/JmentoringSpec';
import AccountReactivation from '@/components/Content/AccountReactivation';

function FullModal(props: FullModalProps) {
  return (
    <FullModalContainer>
      {(() => {
        switch (props.modalType) {
          case 'best-case':
            return <MBestCaseContent modalHandler={props.modalHandler} />;
          case 'account-reactive':
            return (
              <AccountReactivation
                onActive={props.modalHandler}
                onNonActive={props.cancelModalHandler}
              />
            );
          case 'login-request':
            return <LoginRequest modalHandler={props.modalHandler} />;
          case 'senior-my-profile':
            return <SeniorMyProfile modalHandler={props.modalHandler} />;
          case 'junior-mentoring-spec':
            return (
              <MentoringSpec
                modalHandler={props.modalHandler}
                cancelModalHandler={props.cancelModalHandler || (() => {})}
                mentoringId={props.selectedMentoringId || 0}
              />
            );
          case 'profile-modify':
            return <ProfileModify modalHandler={props.modalHandler} />;
          case 'accept-mentoring':
            return <SmentoringAccept modalHandler={props.modalHandler} />;
          case 'senior-info-modify':
            return (
              <SInfoModify
                bModalHandler={props.bModalHandler || (() => {})}
                modalHandler={props.modalHandler}
              />
            );
          case 'senior-mentoring-time':
            return <AddTime modalHandler={props.modalHandler} />;
          case 'senior-mentoring-spec':
            return (
              <SmentoringSpec
                cancelModalHandler={props.cancelModalHandler || (() => {})}
                modalHandler={props.modalHandler}
                acceptModalHandler={props.acceptModalHandler || (() => {})}
                mentoringId={props.mentoringId || 0}
              />
            );
          case 'select-date-calendar':
            return (
              <SelectCalendar
                modalHandler={props.modalHandler}
                targetAtom={props.targetAtom || firAbleTimeAtom}
              />
            );
          default:
            return null;
        }
      })()}
    </FullModalContainer>
  );
}

export default FullModal;
