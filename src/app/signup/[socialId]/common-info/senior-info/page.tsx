'use client';
import ModalBtn from "@/components/Button/ModalBtn";
import RiseUpModal from "@/components/Modal/RiseUpModal";
import useModal from "@/hooks/useModal";
import { createPortal } from "react-dom";
import styled from "styled-components";

function SeniorInfoPage() {
  const { modal, modalHandler, portalElement } = useModal('senior-info-portal');

  return (
    <SeniorInfoPageContainer>
      <h3>선배 정보를 입력해주세요</h3>
      <div>입력한 정보는 멘토링 매칭에 이용됩니다.</div>
      <BtnContainer>
        <ModalBtn btnText="대학원*" modalHandler={modalHandler} />
        <ModalBtn btnText="학과*" modalHandler={modalHandler} />
        <ModalBtn btnText="연구실명*" modalHandler={modalHandler} />
        <ModalBtn btnText="지도 교수님*" modalHandler={modalHandler} />
        <ModalBtn btnText="연구분야*" modalHandler={modalHandler} />
        <ModalBtn btnText="연구 주제 키워드*" modalHandler={modalHandler} />
      </BtnContainer>
      {modal && portalElement
        ? createPortal(<RiseUpModal modalHandler={modalHandler} />, portalElement)
        : null}
    </SeniorInfoPageContainer>
  )
}

export default SeniorInfoPage;

const SeniorInfoPageContainer = styled.div`
  width: inherit;
  height: 100%;
`

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
`