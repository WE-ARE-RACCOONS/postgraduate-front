import Image from "next/image";
import { FieldBox, FieldContainer, PMContainer, FieldTitle, FieldForm } from "./ProfileModify.styled";
import x_icon from '../../../../public/x.png';
import { MODIFY_DIRECTION } from "@/constants/form/cProfileModifyForm";

function ProfileModify({ modalHandler } : { modalHandler: () => void }) {
  return(
    <PMContainer>
      <Image id="x-icon" src={x_icon} alt="프로필 변경 모달 닫기 버튼" onClick={modalHandler} />
      <FieldContainer>
        <FieldBox>
          <FieldTitle>{MODIFY_DIRECTION.lab}</FieldTitle>
          <FieldForm type="text" />
        </FieldBox>
        <FieldBox>
          <FieldTitle>{MODIFY_DIRECTION.keywords}</FieldTitle>
          <FieldForm as="button"></FieldForm>
        </FieldBox>
        <FieldBox>
          <FieldTitle>{MODIFY_DIRECTION.field}</FieldTitle>
          <FieldForm as="button"></FieldForm>
        </FieldBox>
        <FieldBox>
          <FieldTitle>{MODIFY_DIRECTION.introduce}</FieldTitle>
          <FieldForm type="text" />
        </FieldBox>
        <FieldBox>
          <FieldTitle>{MODIFY_DIRECTION.target}</FieldTitle>
          <FieldForm type="text" />
        </FieldBox>
        <FieldBox>
          <FieldTitle>{MODIFY_DIRECTION.chatLink}</FieldTitle>
          <FieldForm type="text" />
        </FieldBox>
      </FieldContainer>
    </PMContainer>
  )
}

export default ProfileModify;