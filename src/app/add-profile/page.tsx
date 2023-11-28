'use client';
import ProgressBar from "@/components/Bar/ProgressBar";
import styled from "styled-components";

function AddProfilePage() {

  return (
    <AddProfilePageContainer>
      <ProgressBar activeTab={1} />
    </AddProfilePageContainer>
  );
}

export default AddProfilePage;

const AddProfilePageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`
