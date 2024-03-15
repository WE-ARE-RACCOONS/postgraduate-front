import SingleValidator from '@/components/Validator/SingleValidator';
import TextForm from '../TextForm';
import ClickedBtn from '@/components/Button/ClickedBtn';
import { useEffect, useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  sKeywordAtom,
  selectedKeywordAtom,
  totalKeywordAtom,
} from '@/stores/senior';
import {
  KeywordFormBtnContainer,
  KeywordFormContainer,
  KeywordFormWrapper,
  KeywordInputFormBox,
} from './Keyword.styled';
import { SELECT_KEYWORD_TEXT } from '@/constants/keyword/keyword';
import SelectedBtn from '@/components/Button/SelectedBtn';

function KeywordForm({ clickHandler }: { clickHandler: () => void }) {
  const [flag, setFlag] = useState(false);
  const [totalBtns, setTotalBtns] = useAtom(totalKeywordAtom);
  const [selected, setSelected] = useAtom(selectedKeywordAtom);
  const setSKeyword = useSetAtom(sKeywordAtom);
  const [userInputKeyword, setUserInputKeyword] = useState('');
  const [inputCount, setInputCount] = useState(0);
  const handleConfirm = () => {
    if (selected.length == 0) setFlag(true);
    else {
      setFlag(false);
      setSKeyword(selected.join(','));
      clickHandler();
    }
  };

  const addKeyword = () => {
    if (userInputKeyword && inputCount < 6) {
      setTotalBtns([...totalBtns, userInputKeyword]);
      setSelected([...selected, userInputKeyword]);
      setUserInputKeyword('');
      setInputCount(inputCount + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (newValue.length <= 10) {
      setUserInputKeyword(newValue);
    }
  };

  useEffect(() => {
    if (selected.length > 0) {
      setFlag(false);
    }
    else{
      setFlag(true);
    }
  }, [selected]);

  return (
    <KeywordFormContainer>
      <KeywordFormWrapper>
        <h3 id="select-keyword-title">{SELECT_KEYWORD_TEXT.keywordTitle}</h3>
        <div id="select-keyword-subtitle">
          <div id="select-keyword-subtitle-text">
            <div id="keyword-text">{SELECT_KEYWORD_TEXT.keywordText}</div>
            <div id="keyword-star">*</div>
          </div>
          {flag && (
            <div id="keyword-alert">{SELECT_KEYWORD_TEXT.keywordAlert}</div>
          )}
        </div>
        <div id="select-keyword-direction">
          {SELECT_KEYWORD_TEXT.keywordDirection}
        </div>
        <KeywordFormBtnContainer>
          {totalBtns &&
            totalBtns.map((el, idx) => (
              <SelectedBtn
                btnText={el}
                selected={selected}
                selectHandler={setSelected}
                key={idx}
              />
            ))}
        </KeywordFormBtnContainer>
        {selected.length < 6 && (
          <KeywordInputFormBox>
            <input
              id="keyword-input-form"
              type="text"
              value={userInputKeyword || ''}
              placeholder={SELECT_KEYWORD_TEXT.keywordInputDirection}
              onChange={handleInputChange}
              max={10}
            />
            <button id="keyword-input-btn" onClick={addKeyword}>
              {SELECT_KEYWORD_TEXT.keywordInputBtnText}
            </button>
          </KeywordInputFormBox>
        )}
      </KeywordFormWrapper>
      {flag ?  <button id="keyword-submit-btn-non">
        확인
      </button> :  <button id="keyword-submit-btn" onClick={handleConfirm}>
        확인
      </button>}
    </KeywordFormContainer>
  );
}

export default KeywordForm;
