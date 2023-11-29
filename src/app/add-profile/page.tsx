'use client';
import ProgressBar from "@/components/Bar/ProgressBar";
import ClickedBtn from "@/components/Button/ClickedBtn";
import FullModal from "@/components/Modal/FullModal";
import ProfileForm from "@/components/SingleForm/ProfileForm";
import SingleValidator from "@/components/Validator/SingleValidator";
import { PROFILE_PLACEHOLDER, PROFILE_TITLE } from "@/constants/form/cProfileForm";
import useModal from "@/hooks/useModal";
import { sMultiIntroduce, sRecommendedFor, sSingleIntroduce } from "@/stores/senior";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

function AddProfilePage() {
  const [singleIntro, setSingleIntro] = useAtom(sSingleIntroduce);
  const [multiIntro, setMultiIntro] = useAtom(sMultiIntroduce);
  const [recommended, setRecommended] = useAtom(sRecommendedFor);
  const [flag, setFlag] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const router = useRouter();
  const { modal, modalHandler, portalElement } = useModal('senior-best-case-portal');

  const handleClick = () => {
    if(!singleIntro) {
      showAlert('한줄소개를 입력해주세요');
      return;
    }

    if(!multiIntro) {
      showAlert('자기소개를 입력해주세요');
      return;
    }

    if(!recommended) {
      showAlert('추천대상을 입력해주세요');
      return;
    }

    if(multiIntro.length < 50) {
      showAlert('자기소개를 50자 이상 작성해주세요');
      return;
    }
    if(recommended.length < 50) {
      showAlert('추천대상을 50자 이상 작성해주세요');
      return;
    }

    setFlag(false);
    router.push('/add-time');
    return;
  }

  const showAlert = (msg: string) => {
    setAlertMsg(msg);
    setFlag(true);
    return;
  }

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
      <ClickedBtn btnText="우수 대학원 선배 프로필 보기" clickHandler={() => {modalHandler()}} />
      {flag && <SingleValidator msg={alertMsg} textColor="#FF0000" />}
      <div>
        <button onClick={() => {router.push('/mypage')}}>이전</button>
        <button onClick={handleClick}>다음</button>
      </div>
      {modal && portalElement ? createPortal(<FullModal />, portalElement) : null}
    </AddProfilePageContainer>
  );
}

export default AddProfilePage;

const AddProfilePageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`
