'use client';
import IntroCard from '@/components/Card/IntroCard';
import KeywordCard from '@/components/Card/KeywordCard';
import ProfileCard from '@/components/Card/ProfileCard';
import BackHeader from '@/components/Header/BackHeader';
import useAuth from '@/hooks/useAuth';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';

import useDimmedModal from '@/hooks/useDimmedModal';
import { useGetSeniorInfoQuery } from '@/hooks/query/useGetSeniorInfo';

export function SeniorInfoPage({ params }: { params: { seniorId: string } }) {
  const router = useRouter();
  const currentPath = usePathname();
  const pathArr = currentPath.split('/');
  const koreanCharWidth = 1.2;

  const { data } = useGetSeniorInfoQuery({ seniorId: params.seniorId });

  const { getUserType } = useAuth();

  const [overWidth, setOverWidth] = useState(false);

  const { openModal: openChangeJuniorModal } = useDimmedModal({
    modalType: 'changeJunior',
  });

  const { openModal: openMentoringNotLoginModal } = useDimmedModal({
    modalType: 'mentoringLogin',
  });

  useEffect(() => {
    if (data) {
      const totalWidth =
        14 *
        koreanCharWidth *
        ((data.major.length || 0) + (data.postgradu.length || 0) + 3);
      if (totalWidth >= 208) setOverWidth(true);
    }
  }, [data?.major, data?.postgradu, koreanCharWidth]);

  const applyHandler = () => {
    const userType = getUserType();

    if (userType === 'junior') {
      router.push(`/mentoring-apply/${params.seniorId}/question`);
    } else if (userType === 'senior') {
      openChangeJuniorModal();
    } else {
      openMentoringNotLoginModal();
    }
  };

  const editHandler = () => {
    router.push(`/senior/edit-profile`);
  };

  if (!data) {
    return null;
  }

  const {
    isMine,
    certification,
    nickName,
    term,
    target,
    profile,
    postgradu,
    major,
    lab,
    professor,
    keyword,
    info,
    oneLiner,
    times,
  } = data;

  return (
    <ErrorBoundary fallback={<div>에러가 발생하였습니다</div>}>
      <SeniorInfoPageContainer>
        <BackHeader headerText="멘토 선배 소개" />
        <SeniorInfoContentWrapper>
          <SeniorInfoContent $overWidth={overWidth}>
            <div id="profile-card-wrapper">
              <ProfileCard
                oneLinear={oneLiner}
                lab={lab}
                profile={profile}
                nickname={nickName}
                term={term}
                postgradu={postgradu}
                major={major}
                professor={professor}
                certification={certification}
              />
            </div>
            <div id="keyword-card-wrapper">
              <KeywordCard lab={lab} keyword={keyword} />
            </div>
            <div id="intro-card-wrapper">
              <IntroCard info={info} target={target} times={times} />
            </div>
          </SeniorInfoContent>
        </SeniorInfoContentWrapper>
        {isMine ? (
          <MentoringApplyBtn onClick={editHandler}>수정하기</MentoringApplyBtn>
        ) : (
          <>
            <MentoringApplyBtn onClick={applyHandler}>
              멘토링 신청
            </MentoringApplyBtn>
          </>
        )}
      </SeniorInfoPageContainer>
    </ErrorBoundary>
  );
}

const SeniorInfoPageContainer = styled.div`
  width: inherit;
  height: auto;
  position: relative;
`;

const SeniorInfoContentWrapper = styled.div`
  width: inherit;
  height: auto;
  position: relative;
  padding-bottom: 4.5rem;
  background-color: #f8f9fb;
`;

const SeniorInfoContent = styled.div<{ $overWidth: boolean }>`
  width: 100%;
  height: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  #profile-card-wrapper {
    width: 100%;
    height: ${(props) => (props.$overWidth ? '8.25rem' : '7.25rem')};
  }

  #keyword-card-wrapper {
    width: 100%;
    margin-top: 28px;
    height: auto;
  }

  #intro-card-wrapper {
    width: 100%;
    height: max-content;
    margin-bottom: 0.625rem;
  }
`;

const MentoringApplyBtn = styled.button`
  width: 19.44rem;
  height: 3.375rem;
  position: fixed;
  left: 50%;
  bottom: 1rem;
  transform: translateX(-50%);
  border-radius: 12px;
  border: 0;
  background-color: #2fc4b2;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  font-family: Pretendard;
  cursor: pointer;
`;
