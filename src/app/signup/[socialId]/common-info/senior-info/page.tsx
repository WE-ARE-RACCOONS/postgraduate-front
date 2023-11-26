'use client';
import ModalBtn from "@/components/Button/ModalBtn";
import NextBtn from "@/components/Button/NextBtn";
import RiseUpModal from "@/components/Modal/RiseUpModal";
import TextForm from "@/components/SingleForm/TextForm";
import useModal from "@/hooks/useModal";
import { sLabAtom, sMajorAtom, sPostGraduAtom } from "@/stores/senior";
import { ModalType } from "@/types/modal/riseUp";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

function SeniorInfoPage() {
  const [modalType, setModalType] = useState<ModalType>('postgradu');
  const { modal, modalHandler, portalElement } = useModal('senior-info-portal');
  const sPostGradu = useAtomValue(sPostGraduAtom);
  const sMajor = useAtomValue(sMajorAtom);

  return (
    <SeniorInfoPageContainer>
      <h3>선배 정보를 입력해주세요</h3>
      <div>입력한 정보는 멘토링 매칭에 이용됩니다.</div>
      <BtnContainer>
        <ModalBtn btnText={sPostGradu ? sPostGradu : '대학원*'} modalHandler={modalHandler} onClick={() => {setModalType('postgradu')}} />
        <ModalBtn btnText={sMajor ? sMajor : '학과*'} modalHandler={modalHandler} onClick={() => {setModalType('major')}} />
        {/* <ModalBtn btnText="연구실명*" modalHandler={modalHandler} />
        <ModalBtn btnText="지도 교수님*" modalHandler={modalHandler} /> */}
        <TextForm placeholder="연구실명*" targetAtom='lab' />
        <TextForm placeholder="지도 교수님*" targetAtom='professor' />
        <ModalBtn btnText="연구분야*" modalHandler={modalHandler} onClick={() => {setModalType('field')}} />
        <ModalBtn btnText="연구 주제 키워드*" modalHandler={modalHandler} onClick={() => {setModalType('keyword')}} />
        {/* 입력 조건 만족했을 때 넘어가는 걸로 NextBtn 클릭 이벤트 추가 */}
        <NextBtn kind="route" url="/signup/done" btnText="완료" />
      </BtnContainer>
      {modal && portalElement
        ? createPortal(<RiseUpModal modalHandler={modalHandler} modalType={modalType} />, portalElement)
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