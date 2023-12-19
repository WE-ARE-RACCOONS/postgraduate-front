import { InfoFieldForm, InfoFieldTitle, SInfoContainer, SInfoImgBox, ValidatorBox } from "./SInfoModify.styled";
import x_icon from '../../../../public/x.png';
import user_icon from '../../../../public/user.png';
import camera_icon from '../../../../public/camera.png';
import Image from "next/image";
import RoundedImage from "@/components/Image/RoundedImage";
import NicknameForm from "@/components/SingleForm/NicknameForm";
import PhoneNumForm from "@/components/SingleForm/PhoneNumForm";
import { useState } from "react";
import SingleValidator from "@/components/Validator/SingleValidator";
import ClickedBtn from "@/components/Button/ClickedBtn";

function SInfoModify({ modalHandler } : { modalHandler: () => void }) {
  const [flag, setFlag] = useState(false);

  return(
    <SInfoContainer>
      <SInfoImgBox>
        <RoundedImage imgSrc={user_icon} altMsg="계정 프로필 사진" />
        <Image id="camera-icon" src={camera_icon} alt="카메라 아이콘" />
      </SInfoImgBox>
      <Image
        id="x-icon"
        src={x_icon}
        alt="계정 수정 모달 닫기 버튼"
        onClick={modalHandler}
      />
      <div id="nickname-form-wrapper">
        <NicknameForm />
      </div>
      <div id="phonenum-form-wrapper">
        <PhoneNumForm />
      </div>
      <div id="account-form-wrapper">
        <InfoFieldTitle>계좌번호</InfoFieldTitle>
        <InfoFieldForm $width="20.5rem" />
      </div>
      <div id="bank-and-name-wrapper">
        <div id="bank-form-wrapper">
          <InfoFieldTitle>은행명</InfoFieldTitle>
          <InfoFieldForm $width="11.56rem" />
        </div>
        <div id="name-form-wrapper">
          <InfoFieldTitle>예금주</InfoFieldTitle>
          <InfoFieldForm $width="8.2rem" />
        </div>
      </div>
      {flag && (
        <ValidatorBox>
          <SingleValidator
            textColor="#ff0000"
            msg="입력하지 않은 내용이 있습니다."
          />
        </ValidatorBox>      
      )}
      <div id="submit-btn-box">
        <ClickedBtn btnText="저장" clickHandler={() => {}} />
      </div>
    </SInfoContainer>
  )
}

export default SInfoModify;