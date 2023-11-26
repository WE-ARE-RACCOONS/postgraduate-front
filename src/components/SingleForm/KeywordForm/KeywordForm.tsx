import SingleValidator from "@/components/Validator/SingleValidator";
import TextForm from "../TextForm";
import ConfirmBtn from "@/components/Button/ConfirmBtn";
import { useState } from "react";
import { useAtomValue } from "jotai";
import { sKeywordAtom } from "@/stores/senior";

function KeywordForm({ clickHandler } : { clickHandler: () => void }) {
  const inputKeyword = useAtomValue(sKeywordAtom);
  const [flag, setFlag] = useState(false);

  const handleClick = () => {
    if(!inputKeyword) setFlag(true);
    else {
      setFlag(false);
      clickHandler();
    }
  }

  return (
    <div>
      <div>
        연구 주제를 잘 설명하는 키워드를 알려주세요.
        <br />
        쉼표(,)로 구분해 적으면,
        <br />
        프로필에 해시태그(#) 형태로 표기됩니다.
      </div>
      <div>
        e.g. 키워드 1, 키워드 2, 키워드 3, 키워드 4
      </div>
      <TextForm placeholder="연구 주제 키워드" targetAtom="keyword" />
      {flag && <SingleValidator textColor="#FF0000" msg="연구 주제 키워드를 입력하세요" />}
      <ConfirmBtn clickHandler={handleClick} />
    </div>
  )
}

export default KeywordForm;