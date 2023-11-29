'use client';
import ProgressBar from "@/components/Bar/ProgressBar";
import ClickedBtn from "@/components/Button/ClickedBtn";
import ProfileForm from "@/components/SingleForm/ProfileForm";
import SingleValidator from "@/components/Validator/SingleValidator";
import { PROFILE_PLACEHOLDER, PROFILE_TITLE } from "@/constants/form/cProfileForm";
import { sMultiIntroduce, sRecommendedFor, sSingleIntroduce } from "@/stores/senior";
import { useAtom } from "jotai";
import styled from "styled-components";

function AddProfilePage() {
  const [singleIntro, setSingleIntro] = useAtom(sSingleIntroduce);
  const [multiIntro, setMultiIntro] = useAtom(sMultiIntroduce);
  const [recommended, setRecommended] = useAtom(sRecommendedFor);

  return (
    <AddProfilePageContainer>
      <ProgressBar activeTab={0} />
      <ProfileForm 
        lineType="single" 
        title={PROFILE_TITLE.single_introduce} 
        placeholder={PROFILE_PLACEHOLDER.single_introduce}
        changeHandler={setSingleIntro} />
      <ProfileForm 
        lineType="multi" 
        title={PROFILE_TITLE.multi_introduce} 
        placeholder={PROFILE_PLACEHOLDER.multi_introduce} 
        maxLength={1000}
        changeHandler={setMultiIntro} />
      <ProfileForm 
        lineType="multi" 
        title={PROFILE_TITLE.recommended_for} 
        placeholder={PROFILE_PLACEHOLDER.recommended_for} 
        maxLength={1000}
        changeHandler={setRecommended} />
      <ClickedBtn btnText="우수 대학원 선배 프로필 보기" clickHandler={() => {/** 모달 핸들러 */}} />
      <SingleValidator msg="OOO을 입력해주세요" textColor="#FF0000" />
      <div>
        <button>이전</button>
        <button>다음</button>
      </div>
    </AddProfilePageContainer>
  );
}

export default AddProfilePage;

const AddProfilePageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`
