import { InfoFieldForm, InfoFieldTitle, SInfoContainer, SInfoImgBox, ValidatorBox } from "./SInfoModify.styled";
import x_icon from '../../../../public/x.png';
import user_icon from '../../../../public/user.png';
import camera_icon from '../../../../public/camera.png';
import Image from "next/image";
import RoundedImage from "@/components/Image/RoundedImage";
import NicknameForm from "@/components/SingleForm/NicknameForm";
import PhoneNumForm from "@/components/SingleForm/PhoneNumForm";
import { useEffect, useState } from "react";
import SingleValidator from "@/components/Validator/SingleValidator";
import ClickedBtn from "@/components/Button/ClickedBtn";
import useAuth from "@/hooks/useAuth";
import axios from "axios";

function SInfoModify({ modalHandler } : { modalHandler: () => void }) {
  const [flag, setFlag] = useState(false);
  const [accHolder, setAccHolder] = useState('');
  const [accNumber, setAccNumber] = useState('');
  const [bank, setBank] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  
  const { getAccessToken } = useAuth();

  useEffect(() => {
    const accessTkn = getAccessToken();
    
    if(accessTkn) {
      axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/senior/me/account`, {
        headers: {
          Authorization: `Bearer ${accessTkn}`
        }
      })
      .then((response) => {
        const res = response.data;

        if(res.code == "SNR200") {
          setAccHolder(res.data.accountHolder || '');
          setAccNumber(res.data.accountNumber || '');
          setBank(res.data.bank || '');
          setNickname(res.data.nickName || '');
          setPhoneNum(res.data.phoneNumber || '');
          // setProfileUrl(res.data.profile || '');
        }
      })
      .catch((err) => {
        console.error(err);
      })
    }
    
  }, []);

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
        <NicknameForm defaultValue={nickname} />
      </div>
      <div id="phonenum-form-wrapper">
        <PhoneNumForm defaultValue={phoneNum} />
      </div>
      <div id="account-form-wrapper">
        <InfoFieldTitle>계좌번호</InfoFieldTitle>
        <InfoFieldForm $width="20.5rem" type="text" defaultValue={accNumber} />
      </div>
      <div id="bank-and-name-wrapper">
        <div id="bank-form-wrapper">
          <InfoFieldTitle>은행명</InfoFieldTitle>
          <InfoFieldForm $width="11.56rem" type="text" defaultValue={bank} />
        </div>
        <div id="name-form-wrapper">
          <InfoFieldTitle>예금주</InfoFieldTitle>
          <InfoFieldForm $width="8.2rem" type="text" defaultValue={accHolder} />
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