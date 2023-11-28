'use client';
import ProgressBar from "@/components/Bar/ProgressBar";
import ProfileForm from "@/components/SingleForm/ProfileForm";
import { PROFILE_PLACEHOLDER, PROFILE_TITLE } from "@/constants/form/cProfileForm";
import styled from "styled-components";

function AddProfilePage() {

  return (
    <AddProfilePageContainer>
      <ProgressBar activeTab={0} />
      <ProfileForm lineType="single" title={PROFILE_TITLE.single_introduce} placeholder={PROFILE_PLACEHOLDER.single_introduce} />
      <ProfileForm lineType="multi" title={PROFILE_TITLE.multi_introduce} placeholder={PROFILE_PLACEHOLDER.multi_introduce} />
      <ProfileForm lineType="multi" title={PROFILE_TITLE.recommended_for} placeholder={PROFILE_PLACEHOLDER.recommended_for} />
    </AddProfilePageContainer>
  );
}

export default AddProfilePage;

const AddProfilePageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`
