import { RiseUpModalProps } from '@/types/modal/riseUp';
import { ModalBackground } from './RiseUpModal.styled';
import SearchForm from '@/components/SingleForm/SearchForm';
import SelectForm from '@/components/SingleForm/SelectForm';
import KeywordForm from '@/components/SingleForm/KeywordForm/KeywordForm';
import BankForm from '@/components/SingleForm/BankForm';
import { WishSeniorApplyAgreeModal } from '@/app/apply-wanted-senior/(components)/(modal)/WishSeniorApplyAgreeModal';

function RiseUpModal(props: RiseUpModalProps) {
  return (
    <ModalBackground onClick={props.modalHandler}>
      <div className="rise-up-modal" onClick={(e) => e.stopPropagation()}>
        {(props.modalType == 'postgradu' || props.modalType == 'major') && (
          <SearchForm
            clickHandler={props.modalHandler}
            formType={props.modalType}
          />
        )}
        {props.modalType == 'field' && (
          <SelectForm clickHandler={props.modalHandler} />
        )}
        {props.modalType == 'keyword' && (
          <KeywordForm clickHandler={props.modalHandler} />
        )}
        {props.modalType == 'bank' && (
          <BankForm clickHandler={props.modalHandler} />
        )}

        {props.modalType === 'wish-senior-apply' && (
          <WishSeniorApplyAgreeModal modalHandler={props.modalHandler} />
        )}
      </div>
    </ModalBackground>
  );
}

export default RiseUpModal;
