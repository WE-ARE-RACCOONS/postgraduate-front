import Image from "next/image";
import { FieldBox, FieldContainer, PMContainer, FieldTitle, FieldForm, ValidatorBox, SaveBtnBox } from "./ProfileModify.styled";
import x_icon from '../../../../public/x.png';
import { MODIFY_DIRECTION } from "@/constants/form/cProfileModifyForm";
import { useState } from "react";
import SingleValidator from "@/components/Validator/SingleValidator";
import ClickedBtn from "@/components/Button/ClickedBtn";

function ProfileModify({ modalHandler } : { modalHandler: () => void }) {
  const [flag, setFlag] = useState(false);
  const [lab, setLab] = useState('');
  const [keyword, setKeyword] = useState([]);
  const [info, setInfo] = useState('');
  const [target, setTarget] = useState('');
  const [chatLink, setChatLink] = useState('');
  const [field, setField] = useState([]);
  const [oneLiner, setOneLiner] = useState('');
  const [time, setTime] = useState('');

  return(
    <PMContainer>
      <Image id="x-icon" src={x_icon} alt="프로필 변경 모달 닫기 버튼" onClick={modalHandler} />
      <FieldContainer>
        <FieldBox>
          <FieldTitle>{MODIFY_DIRECTION.lab}</FieldTitle>
          <FieldForm defaultValue={lab} type="text" />
        </FieldBox>
        <FieldBox>
          <FieldTitle>{MODIFY_DIRECTION.keywords}</FieldTitle>
          <FieldForm as="button">{keyword.join()}</FieldForm>
        </FieldBox>
        <FieldBox>
          <FieldTitle>{MODIFY_DIRECTION.field}</FieldTitle>
          <FieldForm as="button">{field.join()}</FieldForm>
        </FieldBox>
        <FieldBox>
          <FieldTitle>{MODIFY_DIRECTION.oneLiner}</FieldTitle>
          <FieldForm defaultValue={oneLiner} type="text" />
        </FieldBox>
        <FieldBox>
          <FieldTitle>{MODIFY_DIRECTION.introduce}</FieldTitle>
          <FieldForm defaultValue={info} type="text" />
        </FieldBox>
        <FieldBox>
          <FieldTitle>{MODIFY_DIRECTION.target}</FieldTitle>
          <FieldForm defaultValue={target} type="text" />
        </FieldBox>
        <FieldBox>
          <FieldTitle>{MODIFY_DIRECTION.chatLink}</FieldTitle>
          <FieldForm defaultValue={chatLink} type="text" />
        </FieldBox>
        <FieldBox>
          <FieldTitle>{MODIFY_DIRECTION.time}</FieldTitle>
          <FieldForm defaultValue={time} type="text" />
        </FieldBox>
      </FieldContainer>
      {flag && (
        <ValidatorBox>
          <SingleValidator textColor="#ff0000" msg="입력하지 않은 내용이 있습니다." />
        </ValidatorBox>
      )}
      <SaveBtnBox>
        <ClickedBtn btnText="저장" clickHandler={() => {}} />
      </SaveBtnBox>
    </PMContainer>
  )
}

export default ProfileModify;