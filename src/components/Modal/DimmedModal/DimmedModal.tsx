import { DimmedModalProps } from '@/types/modal/dimmed';
import { DimmedBgContainer, DimmedMdContainer } from './DimmedModal.styled';
import MProfileContent from '@/components/Content/MProfileContent';
import LoginRequest from '@/components/Content/LoginRequest/LoginRequest';
import NotSenior from '../NotSenior/NotSenior';
import { userType } from '@/types/user/user';
import SmentoringCancel from '@/components/Mentoring/SmentoringCancel/SmentoringCancel';
import MentoringCancel from '@/components/Mentoring/MentoringCancel/MentoringCancel';
import SNotRegistered from '@/components/Content/SNotRegistered';
import SuggestModal from '@/components/SuggestModal/SuggestModal';
import AproveModal from '../AproveModal/AproveModal';
function DimmedModal(props: DimmedModalProps) {
  return (
    <DimmedBgContainer onClick={props.modalHandler}>
      <DimmedMdContainer onClick={(e) => e.stopPropagation()}>
        {props.modalType == 'postgraduProfile' && (
          <MProfileContent modalHandler={props.modalHandler} />
        )}
        {props.modalType == 'notuser' && (
          <LoginRequest modalHandler={props.modalHandler} />
        )}
        {props.modalType == 'notSenior' && (
          <NotSenior modalHandler={props.modalHandler} />
        )}
        {props.modalType == 'cancelMent' && (
          <SmentoringCancel
            mentoringId={props.mentoringId || 0}
            modalHandler={props.modalHandler}
          />
        )}
        {props.modalType == 'juniorCancelMent' && (
          <MentoringCancel
            mentoringId={props.mentoringId || 0}
            modalHandler={props.modalHandler}
          />
        )}
        {props.modalType == 'notRegistered' && (
          <SNotRegistered modalHandler={props.modalHandler} />
        )}
        {props.modalType == 'mypageSuggest' && (
          <SuggestModal
            infoHandler={props.infoHandler && props.infoHandler}
            modalHandler={props.modalHandler}
          />
        )}
        {props.modalType == 'authAproveMsg' && (
          <AproveModal
            certifiReg={props.certifiReg || ''}
            modalHandler={props.modalHandler}
          />
        )}
      </DimmedMdContainer>
    </DimmedBgContainer>
  );
}

export default DimmedModal;
