'use client';
import ModalBtn from '@/components/Button/ModalBtn';
import BackHeader from '@/components/Header/BackHeader'
import FullModal from '@/components/Modal/FullModal';
import RiseUpModal from '@/components/Modal/RiseUpModal';
import ProfileForm from '@/components/SingleForm/ProfileForm';
import TextForm from '@/components/SingleForm/TextForm';
import { PROFILE_PLACEHOLDER, PROFILE_TITLE } from '@/constants/form/cProfileForm';
import useModal from '@/hooks/useModal';
import { sChatLink, sFieldAtom, sKeywordAtom, sMultiIntroduce, sRecommendedFor, sSingleIntroduce } from '@/stores/senior';
import { ModalType } from '@/types/modal/riseUp';
import { useAtom, useAtomValue } from 'jotai';
import React, { useState } from 'react'
import { createPortal } from 'react-dom';
import styled from 'styled-components';
function page() {
    const [modalType, setModalType] = useState<ModalType>('postgradu');
    const { modal, modalHandler, portalElement } = useModal('senior-info-portal');
    const { modal:timeModal, modalHandler:timeModalHandler, portalElement:timePortalElement } = useModal(
      'senior-mentoring-time-portal'
    );
    const [singleIntro, setSingleIntro] = useAtom(sSingleIntroduce);
  const [multiIntro, setMultiIntro] = useAtom(sMultiIntroduce);
  const [recommended, setRecommended] = useAtom(sRecommendedFor);
  const [chatLink, setChatLink] = useAtom(sChatLink);
  const sField = useAtomValue(sFieldAtom);
  const sKeyword = useAtomValue(sKeywordAtom);
  return (
    <div>
      <BackHeader headerText='프로필 정보'/>
      <EditPContainer>
      <EPTitle>프로필 정보</EPTitle>
      <div style={{marginBottom:'2.62rem'}}>
      <BtnBox>
            <MBtnFont>
              연구실명&nbsp;<div id="font-color">*</div>
              <div id='warn-msg'>&nbsp;연구실명을 입력해주세요</div>
            </MBtnFont>
            <TextForm
              placeholder="연구실 이름을 입력해주세요."
              targetAtom="professor"
            />
          </BtnBox>
          <BtnBox>
          <MBtnFont>
              연구분야&nbsp;<div id="font-color">*</div>
              <div id='warn-msg'>&nbsp;최소 1개 이상 선택해주세요</div>
            </MBtnFont>
          <ModalBtn
            type="seniorInfo"
            btnText={sField ? sField : '연구분야*'}
            modalHandler={modalHandler}
            onClick={() => {
              setModalType('field');
            }}
          />
          </BtnBox>
          <BtnBox>
            <MBtnFont>
              연구주제&nbsp;<div id="font-color">*</div>
              <div id='warn-msg'>&nbsp;최소 1개 이상 입력해주세요</div>
            </MBtnFont>
          <ModalBtn
            type="seniorInfo"
            btnText={sKeyword ? sKeyword : '연구 주제 키워드*'}
            modalHandler={modalHandler}
            onClick={() => {
              setModalType('keyword');
            }}
          />
          </BtnBox>
          </div>
      <EPTitle>멘토링 정보</EPTitle>
      <ProfileForm
        lineType="single"
        title={PROFILE_TITLE.singleIntroduce}
        placeholder={PROFILE_PLACEHOLDER.singleIntroduce}
        formType="singleIntro"
        loadStr={singleIntro}
        changeHandler={setSingleIntro}
      />
      <ProfileForm
        lineType="multi"
        title={PROFILE_TITLE.multiIntroduce}
        placeholder={PROFILE_PLACEHOLDER.multiIntroduce}
        maxLength={1000}
        formType="multiIntro"
        loadStr={multiIntro}
        changeHandler={setMultiIntro}
      />
      <ProfileForm
        lineType="multi"
        title={PROFILE_TITLE.recommendedFor}
        placeholder={PROFILE_PLACEHOLDER.recommendedFor}
        maxLength={1000}
        formType="recommendedFor"
        loadStr={recommended}
        changeHandler={setRecommended}
      />
      <EPMentoring>
       <div>
       <div id ='mentoring-title'>카카오톡 오픈 채팅방 링크</div>
        <div id ='mentoring-sub'>매칭된 후배와 대화할 오픈채팅 방이에요.<br/>
          비대면 회의 링크나 급한 공지를 전달해요.</div>
       </div>
          <input
          type="text"
          id="add-chat-link-form"
          placeholder={PROFILE_PLACEHOLDER.addChatLink}
          onChange={(e) => {
            setChatLink(e.currentTarget.value);
          }}
        />
        </EPMentoring>
        <SetData>
          <div style={{display:'flex',alignItems:'center'}}>
        <div id ='setData-title'>가능 정기일정</div>
        <div id = 'setData-warn'>최소 3개 이상 일정을 추가해주세요</div>
        </div>
        <SetDataForm>
        <div id='setDataF-msg'>입력된 정기 일정이 없습니다.</div>
          <div id='setData-btn' onClick={timeModalHandler}>+ 추가하기</div>
        </SetDataForm>
        </SetData>
      </EditPContainer>
        {modal && portalElement
          ? createPortal(
              <RiseUpModal modalHandler={modalHandler} modalType={modalType} />,
              portalElement,
            )
          : null}
        {timeModal && timePortalElement
        ? createPortal(
            <FullModal
              modalType="senior-mentoring-time"
              modalHandler={timeModalHandler}
            />,
            timePortalElement,
          )
        : null}
    </div>
  )
}

export default page

const EditPContainer = styled.div`
margin-left: 1rem;
`
const SetDataForm = styled.div`
padding: 0 0.75rem;
width: 20.5rem;
height: 3.1875rem;
flex-shrink: 0;
border-radius: 0.5rem;
background: #F8F9FA;
display: flex;
align-items: center;
justify-content: space-between;
#setDataF-msg{
  color: #ADB5BD;
font-family: "Noto Sans JP";
font-size: 1rem;
font-style: normal;
font-weight: 400;
line-height: normal;
}
#setData-btn{
  display: inline-flex;
padding: 0.3125rem 0.625rem;
align-items: center;
gap: 0.25rem;
border-radius: 0.25rem;
background: #495565;
color: #FFF;
font-family: Pretendard;
font-size: 0.75rem;
font-style: normal;
font-weight: 700;
line-height: 1.125rem; /* 150% */
letter-spacing: -0.0375rem;
}
`
const SetData = styled.div`
margin-top: 2.75rem;
#setData-warn{
  color: #F16464;
font-family: "Noto Sans JP";
font-size: 0.75rem;
font-style: normal;
font-weight: 400;
line-height: normal;
margin-left: 0.5rem;
}
  #setData-title{
    color: #212529;
font-family: Pretendard;
font-size: 1rem;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 1.4rem */
letter-spacing: -0.03125rem;
  }
`
const MBtnFont = styled.div`
  display: flex;
  color: #212529;
  font-family: Noto Sans JP;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  #font-color {
    color: #00a0e1;
    font-family: Noto Sans JP;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  #warn-msg{
    color: #F16464;
font-family: "Noto Sans JP";
font-size: 0.75rem;
font-style: normal;
font-weight: 400;
line-height: normal;
  }
`;
const EPTitle = styled.div`
    color: #212529;
font-family: Pretendard;
font-size: 1.25rem;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 1.75rem */
letter-spacing: -0.03125rem;
`
const BtnBox = styled.div`
  margin-top: 1rem;
`;
const EPMentoring  = styled.div`
#add-chat-link-form {
   width: 20.5rem;
height: 3.1875rem;
flex-shrink: 0;
border-radius: 0.5rem;
border: 1px solid #C2CEDE;
background: #FFF;
padding: 0.87rem 0.96rem;

&::placeholder{
  color: #ADB5BD;
font-family: "Noto Sans JP";
font-size: 1rem;
font-style: normal;
font-weight: 400;
line-height: normal;
}
  }
  #mentoring-title{
    color: #212529;
font-family: Pretendard;
font-size: 1rem;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 1.4rem */
letter-spacing: -0.03125rem;
margin-bottom: 0.44rem;
  }
  #mentoring-sub{
    color: #212529;
font-family: Pretendard;
font-size: 0.875rem;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 1.225rem */
letter-spacing: -0.03125rem;
margin-bottom: 0.56rem;
  }
`