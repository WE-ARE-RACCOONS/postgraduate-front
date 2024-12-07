import { DimmedModalProps } from '@/types/modal/dimmed';
import { DimmedBgContainer, DimmedMdContainer } from './DimmedModal.styled';
import MProfileContent from '@/components/Modal/ModalContent/MProfileContent';
import LoginRequest from '@/components/Modal/ModalContent/LoginRequest/LoginRequest';
import NotSenior from '../NotSenior/NotSenior';
import SmentoringCancel from '@/components/domain/mentoring/SmentoringCancel/SmentoringCancel';
import MentoringCancel from '@/components/domain/mentoring/MentoringCancel/MentoringCancel';
import SNotRegistered from '@/components/Modal/ModalContent/SNotRegistered';
import SuggestModal from '@/components/Modal/SuggestModal/SuggestModal';
import AproveModal from '../AproveModal/AproveModal';
import NotJunior from './NotJunior/NotJunior';
import MentoringLogin from '@/components/Modal/ModalContent/MentoringLogin';
import ChangeJunior from '@/components/Modal/ModalContent/ChangeJunior';
import SuccessFail from '@/components/Modal/ModalContent/SuccessFail/SuccessFail';
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
        {props.modalType == 'notJunior' && (
          <NotJunior modalHandler={props.modalHandler} />
        )}
        {props.modalType == 'cancelMent' && (
          <SmentoringCancel
            mentoringId={props.mentoringId || 0}
            modalHandler={props.modalHandler}
            successHandler={props.successHandler}
            cancelModalHandler={props.infoHandler}
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
        {props.modalType == 'mentoringLogin' && (
          <MentoringLogin modalHandler={props.modalHandler} />
        )}
        {props.modalType == 'changeJunior' && (
          <ChangeJunior modalHandler={props.modalHandler} />
        )}
        {props.modalType == 'mentoring-cancel-success' && (
          <SuccessFail modalHandler={props.modalHandler} />
        )}
      </DimmedMdContainer>
    </DimmedBgContainer>
  );
}

export default DimmedModal;
