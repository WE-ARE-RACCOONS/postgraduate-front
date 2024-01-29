import SingleValidator from '@/components/Validator/SingleValidator';
import TextForm from '../TextForm';
import ClickedBtn from '@/components/Button/ClickedBtn';
import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { sKeywordAtom } from '@/stores/senior';
import { KeywordFormBtnContainer, KeywordFormContainer, KeywordFormWrapper, KeywordInputFormBox } from './Keyword.styled';
import { SELECT_KEYWORD_TEXT } from '@/constants/keyword/keyword';

function KeywordForm({ clickHandler }: { clickHandler: () => void }) {
  const inputKeyword = useAtomValue(sKeywordAtom);
  const [flag, setFlag] = useState(false);

  const handleClick = () => {
    if (!inputKeyword) setFlag(true);
    else {
      setFlag(false);
      clickHandler();
    }
  };

  return (
    // <div>
    //   <div>
    //     연구 주제를 잘 설명하는 키워드를 알려주세요.
    //     <br />
    //     쉼표(,)로 구분해 적으면,
    //     <br />
    //     프로필에 해시태그(#) 형태로 표기됩니다.
    //   </div>
    //   <div>e.g. 키워드 1, 키워드 2, 키워드 3, 키워드 4</div>
    //   <TextForm placeholder="연구 주제 키워드" targetAtom="keyword" />
    //   {flag && (
    //     <SingleValidator
    //       textColor="#FF0000"
    //       msg="연구 주제 키워드를 입력하세요"
    //     />
    //   )}
    //   <ClickedBtn kind="click" clickHandler={handleClick} btnText="확인" />
    // </div>
    <KeywordFormContainer>
      <KeywordFormWrapper>
        <h3 id='select-keyword-title'>{SELECT_KEYWORD_TEXT.keywordTitle}</h3>
        <div id='select-keyword-subtitle'>
          <div id='select-keyword-subtitle-text'>
            <div id='keyword-text'>{SELECT_KEYWORD_TEXT.keywordText}</div>
            <div id='keyword-star'>*</div>
          </div>
          {flag && (
            <div id='keyword-alert'>{SELECT_KEYWORD_TEXT.keywordAlert}</div>
          )}
        </div>
        <div id='select-keyword-direction'>{SELECT_KEYWORD_TEXT.keywordDirection}</div>
        <KeywordFormBtnContainer></KeywordFormBtnContainer>
        <KeywordInputFormBox>
          <input
            id='keyword-input-form' 
            type="text"
            placeholder={SELECT_KEYWORD_TEXT.keywordInputDirection}
            onChange={() => {}} />
            <button id='keyword-input-btn' onClick={() => {}}>
              {SELECT_KEYWORD_TEXT.keywordInputBtnText}
            </button>
        </KeywordInputFormBox>
      </KeywordFormWrapper>
      <button id='keyword-submit-btn' onClick={() => {}}>확인</button>
    </KeywordFormContainer>
  );
}

export default KeywordForm;
