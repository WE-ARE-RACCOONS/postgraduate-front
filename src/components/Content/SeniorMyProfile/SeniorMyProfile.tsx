import { SMPContainer, SMPInfoBox, SMPInfoTextBox, SMPIntroDesc, SMPIntroduceBox, SMPLabBox, SMPLabKeywordBox } from "./SeniorMyProfile.styled";
import Image from "next/image";
import x_icon from '../../../../public/x.png';
import user_icon from '../../../../public/user.png';
import RoundedImage from "@/components/Image/RoundedImage";
import AuthLabeledText from "@/components/Text/AuthLabeledText";
import DividedText from "@/components/Text/DividedText";
import BorderedText from "@/components/Text/BorderedText";
import TextField from "@/components/Text/TextField";

function SeniorMyProfile({ modalHandler } : { modalHandler: () => void }) {

  const keywords = ['연구실 주제 키워드1', '연구실 주제 키워드2', '연구실 주제', '연구실 임시 주제 키워드입니다.'];

  return(
    <SMPContainer>
      <Image id="x-icon" src={x_icon} alt="모달 닫기 버튼" onClick={modalHandler} />
      <SMPInfoBox>
        <RoundedImage imgSrc={user_icon} altMsg="선배 프로필 이미지" />
        <SMPInfoTextBox>
          <AuthLabeledText str="선배 이름" />
          <DividedText firStr="대학원 이름" secStr="학과 이름" />
          <div>지도 교수님</div>
          <div id="mentoring-time-box">
            <div id="mentoring-text">멘토링</div>
            <div id="time-text">40분</div>
          </div>
        </SMPInfoTextBox>
      </SMPInfoBox>
      <SMPLabBox>
        <div id="lab-name-text">연구실명</div>
        <SMPLabKeywordBox>
          {keywords.map((el, idx) => (<BorderedText key={idx} str={el} />))}
        </SMPLabKeywordBox>
      </SMPLabBox>
      <hr id="profile-line" />
      <SMPIntroduceBox>
        <div id="profile-single-intro">한줄소개는 여기에 이런 식으로 들어감</div>
        <TextField content="프로필 소개글 여기에 들어감" />
        <div>
          <SMPIntroDesc>이런 분들께 추천드려요</SMPIntroDesc>
          <TextField content="추천 대상 여기에 들어감" />
        </div>
        <div>
          <SMPIntroDesc>멘토링 가능 일정</SMPIntroDesc>
          <TextField content="멘토링 가능 일정 여기에 들어감" />
        </div>
      </SMPIntroduceBox>
      <button id="profile-modify-btn">내 프로필 수정하기</button>
    </SMPContainer>
  )
}

export default SeniorMyProfile;