import { useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
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
import SelectedBtn from '@/components/common/Button/SelectedBtn';
import { useFormContext } from 'react-hook-form';

function KeywordForm({ clickHandler }: { clickHandler: () => void }) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [totalBtns, setTotalBtns] = useAtom(totalKeywordAtom);
  const [selected, setSelected] = useAtom(selectedKeywordAtom);
  const setSKeyword = useSetAtom(sKeywordAtom);
  const [inputCount, setInputCount] = useState(0);
  const handleConfirm = () => {
    setSKeyword(() => selected.join(','));
    clickHandler();
  };

  const addKeyword = () => {
    if (watch('keyword') && inputCount < 6) {
      setTotalBtns([...totalBtns, watch('keyword')]);
      setSelected([...selected, watch('keyword')]);
      setInputCount(inputCount + 1);
      setValue('keyword', '');
    }
  };

  return (
    <KeywordFormContainer>
      <KeywordFormWrapper>
        <h3 id="select-keyword-title">{SELECT_KEYWORD_TEXT.keywordTitle}</h3>
        <div id="select-keyword-direction">
          {SELECT_KEYWORD_TEXT.keywordDirection}
        </div>
        <div id="select-keyword-subtitle">
          {errors?.keyword && (
            <div id="keyword-alert">*{SELECT_KEYWORD_TEXT.keywordAlert}</div>
          )}
        </div>

        <KeywordFormBtnContainer>
          {totalBtns &&
            totalBtns.map((el, idx) => (
              <SelectedBtn
                btnText={`#${el}`}
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
              placeholder={SELECT_KEYWORD_TEXT.placeholder}
              {...register('keyword')}
              max={20}
            />
            <button id="keyword-input-btn" onClick={addKeyword}>
              {SELECT_KEYWORD_TEXT.keywordInputBtnText}
            </button>
          </KeywordInputFormBox>
        )}
      </KeywordFormWrapper>
      {selected.length === 0 ? (
        <button className="keyword-submit-btn-non">저장</button>
      ) : (
        <button id="keyword-submit-btn" onClick={handleConfirm}>
          저장
        </button>
      )}
      <button
        className="keyword-close-btn"
        type="button"
        onClick={clickHandler}
      >
        닫기
      </button>
    </KeywordFormContainer>
  );
}

export default KeywordForm;
