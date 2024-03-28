'use client';
import ProgressBar from '@/components/Bar/ProgressBar';
import ClickedBtn from '@/components/Button/ClickedBtn';
import NextBtn from '@/components/Button/NextBtn';
import BackHeader from '@/components/Header/BackHeader';
import DimmedModal from '@/components/Modal/DimmedModal';
import FullModal from '@/components/Modal/FullModal';
import ProfileForm from '@/components/SingleForm/ProfileForm';
import SingleValidator from '@/components/Validator/SingleValidator';
import {
  PROFILE_DIRECTION,
  PROFILE_PLACEHOLDER,
  PROFILE_SUB_DIRECTION,
  PROFILE_TITLE,
} from '@/constants/form/cProfileForm';
import useModal from '@/hooks/useModal';
import {
  sMultiIntroduce,
  sRecommendedFor,
  sSingleIntroduce,
} from '@/stores/senior';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

function AddProfilePage() {
  const [singleIntro, setSingleIntro] = useAtom(sSingleIntroduce);
  const [multiIntro, setMultiIntro] = useAtom(sMultiIntroduce);
  const [recommended, setRecommended] = useAtom(sRecommendedFor);
  const [flag, setFlag] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const router = useRouter();
  const [buttonAct, setButtonAct] = useState(false);
  const { modal, modalHandler, portalElement } = useModal(
    'senior-best-case-portal',
  );

  const updateBtnSet = () => {
    setButtonAct(
      singleIntro.length >= 10 &&
        multiIntro.length >= 50 &&
        recommended.length >= 50,
    );
  };

  useEffect(() => {
    updateBtnSet();

    if (
      singleIntro.length >= 10 &&
      multiIntro.length >= 50 &&
      recommended.length >= 50
    ) {
      setFlag(false);
    }
  }, [singleIntro, multiIntro, recommended]);

  const handleClick = () => {
    if (!singleIntro) {
      showAlert('한줄소개를 입력해주세요');
      return;
    }

    if (!multiIntro) {
      showAlert('자기소개를 입력해주세요');
      return;
    }

    if (!recommended) {
      showAlert('추천대상을 입력해주세요');
      return;
    }

    if (multiIntro.length < 50) {
      showAlert('자기소개를 50자 이상 작성해주세요');
      return;
    }
    if (recommended.length < 50) {
      showAlert('추천대상을 50자 이상 작성해주세요');
      return;
    }

    setFlag(false);
    router.push('/add-time');
    return;
  };

  const showAlert = (msg: string) => {
    setAlertMsg(msg);
    setFlag(true);
    return;
  };

  return (
    <AddProfilePageContainer>
      <BackHeader headerText="멘토링 소개" />
      <ProgressBar activeNum={0} />
      <div style={{ marginTop: '1.25rem', marginLeft: '1rem' }}>
        <h3>{PROFILE_DIRECTION.addProfile}</h3>
        <div id="profile-sub">{PROFILE_SUB_DIRECTION.addProfile}</div>
      </div>
      <ProfileForm
        flag={flag}
        lineType="single"
        title={PROFILE_TITLE.singleIntroduce}
        placeholder={PROFILE_PLACEHOLDER.singleIntroduce}
        formType="singleIntro"
        maxLength={100}
        loadStr={singleIntro}
        changeHandler={setSingleIntro}
      />
      <div style={{ marginLeft: '1rem' }}>
        {flag && (
          <SingleValidator
            msg={'최소 10자 이상 입력해 주세요.'}
            textColor="#FF3347"
          />
        )}
      </div>
      <ProfileForm
        flag={flag}
        lineType="multi"
        title={PROFILE_TITLE.multiIntroduce}
        placeholder={PROFILE_PLACEHOLDER.multiIntroduce}
        maxLength={1000}
        formType="multiIntro"
        loadStr={multiIntro}
        changeHandler={setMultiIntro}
      />
      <div style={{ marginLeft: '1rem' }}>
        {flag && (
          <SingleValidator
            msg={'최소 50자 이상 입력해 주세요.'}
            textColor="#FF3347"
          />
        )}
      </div>
      <ProfileForm
        flag={flag}
        lineType="multi"
        title={PROFILE_TITLE.recommendedFor}
        placeholder={PROFILE_PLACEHOLDER.recommendedFor}
        maxLength={1000}
        formType="recommendedFor"
        loadStr={recommended}
        changeHandler={setRecommended}
      />
      <div style={{ marginLeft: '1rem' }}>
        {flag && (
          <SingleValidator
            msg={'최소 50자 이상 입력해 주세요.'}
            textColor="#FF3347"
          />
        )}
      </div>
      <ShowProfBtn onClick={modalHandler}>프로필 예시 보기</ShowProfBtn>
      <div style={{ display: 'flex', marginTop: '2rem' }}>
        <PrevBtn
          onClick={() => {
            router.push('/mypage');
          }}
        >
          이전
        </PrevBtn>
        {buttonAct ? (
          <NextAddBtnSet onClick={handleClick}>다음</NextAddBtnSet>
        ) : (
          <NextAddBtn onClick={handleClick}>다음</NextAddBtn>
        )}
      </div>
      {modal && portalElement
        ? createPortal(
            <FullModal modalType="best-case" modalHandler={modalHandler} />,
            portalElement,
          )
        : null}
    </AddProfilePageContainer>
  );
}

export default AddProfilePage;

const AddProfilePageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  #profile-sub {
    margin-top: 0.5rem;
    margin-bottom: 1.69rem;
  }
`;
const PrevBtn = styled.button`
  display: flex;
  width: 35%;
  padding: 1rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.75rem;
  background: #adb5bd;
  border: none;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 1rem;
`;
const ShowProfBtn = styled.button`
  margin-top: 0.5rem;
  display: flex;
  width: 94%;
  height: 2.875rem;
  padding: 1rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  background: #495565;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 1rem;
  border: none;
  cursor: pointer;
`;
const NextAddBtn = styled.button`
  display: flex;
  width: 57%;
  padding: 1rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  margin-left: 0.4rem;
  border-radius: 0.75rem;
  background: #dee2e6;
  border: none;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;
const NextAddBtnSet = styled.button`
  display: flex;
  width: 57%;
  padding: 1rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  margin-left: 0.4rem;
  border: none;
  background: #2fc4b2;
  border-radius: 0.75rem;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;
