import { RiseUpModalProps } from '@/types/modal/riseUp';
import { ModalBackground } from './RiseUpModal.styled';
import SearchForm from '@/components/Form/SearchForm';
import SelectForm from '@/components/Form/SelectForm';
import KeywordForm from '@/components/Form/KeywordForm/KeywordForm';
import BankForm from '@/components/Form/BankForm';
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
          <WishSeniorApplyAgreeModal
            onAgreeWithSeniorApply={props.onAgreeWith}
            modalHandler={props.modalHandler}
          />
        )}
      </div>
    </ModalBackground>
  );
}

export default RiseUpModal;
