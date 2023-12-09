import Image from "next/image";
import { FieldBox, FieldContainer, PMContainer, FieldTitle, FieldForm } from "./ProfileModify.styled";
import x_icon from '../../../../public/x.png';

function ProfileModify({ modalHandler } : { modalHandler: () => void }) {
  return(
    <PMContainer>
      <Image id="x-icon" src={x_icon} alt="프로필 변경 모달 닫기 버튼" onClick={modalHandler} />
      <FieldContainer>
        <FieldBox>
          <FieldTitle>연구실명</FieldTitle>
          <FieldForm type="text" />
        </FieldBox>
        <FieldBox>
          <FieldTitle>연구 주제 키워드</FieldTitle>
          <FieldForm as="button"></FieldForm>
        </FieldBox>
        <FieldBox>
          <FieldTitle>연구 분야</FieldTitle>
          <FieldForm as="button"></FieldForm>
        </FieldBox>
        <FieldBox>
          <FieldTitle>자기소개</FieldTitle>
          <FieldForm type="text" />
        </FieldBox>
        <FieldBox>
          <FieldTitle>이런 후배에게 추천해요</FieldTitle>
          <FieldForm type="text" />
        </FieldBox>
        <FieldBox>
          <FieldTitle>카카오톡 오픈채팅방 링크</FieldTitle>
          <FieldForm type="text" />
        </FieldBox>
      </FieldContainer>
    </PMContainer>
  )
}

export default ProfileModify;