'use client';
import ModalBtn from "@/components/Button/ModalBtn";
import RiseUpModal from "@/components/Modal/RiseUpModal";
import styled from "styled-components";

function SeniorInfoPage() {
  return (
    <div>
      <h3>선배 정보를 입력해주세요</h3>
      <div>입력한 정보는 멘토링 매칭에 이용됩니다.</div>
      <BtnContainer>
        <ModalBtn btnText="대학원*" />
        <ModalBtn btnText="학과*" />
        <ModalBtn btnText="연구실명*" />
        <ModalBtn btnText="지도 교수님*" />
        <ModalBtn btnText="연구분야*" />
        <ModalBtn btnText="연구 주제 키워드*" />
      </BtnContainer>
      <RiseUpModal />
    </div>
  )
}

export default SeniorInfoPage;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
`