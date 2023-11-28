'use client';
import ProgressBar from "@/components/Bar/ProgressBar";
import ProfileForm from "@/components/SingleForm/ProfileForm";
import styled from "styled-components";

function AddProfilePage() {

  return (
    <AddProfilePageContainer>
      <ProgressBar activeTab={0} />
      <ProfileForm lineType="single" title="한줄 소개" placeholder="본인을 한 줄로 소개해주세요" />
    </AddProfilePageContainer>
  );
}

export default AddProfilePage;

const AddProfilePageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`
