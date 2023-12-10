import Image from "next/image";
import { FieldBox, FieldContainer, PMContainer, FieldTitle, FieldForm, ValidatorBox, SaveBtnBox } from "./ProfileModify.styled";
import x_icon from '../../../../public/x.png';
import { MODIFY_DIRECTION } from "@/constants/form/cProfileModifyForm";
import { useEffect, useState } from "react";
import SingleValidator from "@/components/Validator/SingleValidator";
import ClickedBtn from "@/components/Button/ClickedBtn";
import useAuth from "@/hooks/useAuth";
import axios from "axios";

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
  const { getAccessToken } = useAuth();

  useEffect(() => {
    const accessTkn = getAccessToken();

    axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/senior/me/profile`, {
      headers: {
        Authorization: `Bearer ${accessTkn}`
      }
    }).then((response) => {
      const res = response.data;

      if(res.code == "SNR200") {
        setChatLink(res.data.chatLink);
        setField(res.data.field);
        setInfo(res.data.info);
        setKeyword(res.data.keyword);
        setLab(res.data.lab);
        setOneLiner(res.data.oneLiner);
        setTarget(res.data.target);
        setTime(res.data.time);
      }
    }).catch((err) => {
      console.error(err);
    })
    
  }, []);

  return(
    <PMContainer>
      <Image id="x-icon" src={x_icon} alt="프로필 변경 모달 닫기 버튼" onClick={modalHandler} />
      <FieldContainer>
        <FieldBox>
          <FieldTitle>{MODIFY_DIRECTION.lab}</FieldTitle>
          <FieldForm defaultValue={lab} type="text" onChange={(e) => setLab(e.currentTarget.value)} />
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
          <FieldForm defaultValue={oneLiner} type="text" onChange={(e) => setOneLiner(e.currentTarget.value)} />
        </FieldBox>
        <FieldBox>
          <FieldTitle>{MODIFY_DIRECTION.introduce}</FieldTitle>
          <FieldForm defaultValue={info} type="text" onChange={(e) => setInfo(e.currentTarget.value)} />
        </FieldBox>
        <FieldBox>
          <FieldTitle>{MODIFY_DIRECTION.target}</FieldTitle>
          <FieldForm defaultValue={target} type="text" onChange={(e) => setTarget(e.currentTarget.value)} />
        </FieldBox>
        <FieldBox>
          <FieldTitle>{MODIFY_DIRECTION.chatLink}</FieldTitle>
          <FieldForm defaultValue={chatLink} type="text" onChange={(e) => setChatLink(e.currentTarget.value)} />
        </FieldBox>
        <FieldBox>
          <FieldTitle>{MODIFY_DIRECTION.time}</FieldTitle>
          <FieldForm defaultValue={time} type="text" onChange={(e) => setTime(e.currentTarget.value)} />
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