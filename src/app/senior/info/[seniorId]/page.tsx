'use client';
import IntroCard from '@/components/Card/IntroCard';
import KeywordCard from '@/components/Card/KeywordCard';
import ProfileCard from '@/components/Card/ProfileCard';
import BackHeader from '@/components/Header/BackHeader';
import useAuth from '@/hooks/useAuth';
import {
  firAbleTimeAtom,
  questionAtom,
  secAbleTimeAtom,
  subjectAtom,
  thiAbleTimeAtom,
} from '@/stores/mentoring';
import { getDetailSeniorInfoFetch } from '@/api/senior/[id]/getDetailSeniorInfo';
import { enterSeniorId, mySeniorId } from '@/stores/senior';
import findExCode from '@/utils/findExCode';
import axios from 'axios';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import findSuccessCode from '@/utils/findSuccessCode';
import useDimmedModal from '@/hooks/useDimmedModal';

import type { TimeObj } from '@/types/scheduler/scheduler';
import { getImgProps } from 'next/dist/shared/lib/get-img-props';
function SeniorInfoPage({ params }: { params: { seniorId: string } }) {
  const router = useRouter();
  const currentPath = usePathname();
  const pathArr = currentPath.split('/');
  const koreanCharWidth = 1.2; // 한글 글자 너비로 가정

  const { getUserType } = useAuth();
  const [findSeniorId, setFindSeniorId] = useAtom(enterSeniorId);
  const [info, setInfo] = useState('');
  const [keyword, setKeyword] = useState<string[]>([]);
  const [lab, setLab] = useState('');
  const [major, setMajor] = useState('');
  const [nickName, setNickName] = useState('');
  const [oneLiner, setOneLiner] = useState('');
  const [postgradu, setPostgradu] = useState('');
  const [professor, setProfessor] = useState('');
  const [profile, setProfile] = useState('');
  const [target, setTarget] = useState('');
  const [term, setTerm] = useState(30);
  const [times, setTimes] = useState<TimeObj[]>([]);
  const [mine, setMine] = useState(false);
  const [overWidth, setOverWidth] = useState(false);
  const setTempSubject = useSetAtom(subjectAtom);
  const setTempQuestion = useSetAtom(questionAtom);
  const setFirAbleTime = useSetAtom(firAbleTimeAtom);
  const setSecAbleTime = useSetAtom(secAbleTimeAtom);
  const setThiAbleTime = useSetAtom(thiAbleTimeAtom);
  const [certification, setCertification] = useState(Boolean);

  const { openModal: openChangeJuniorModal } = useDimmedModal({
    modalType: 'changeJunior',
  });

  const { openModal: openMentoringNotLoginModal } = useDimmedModal({
    modalType: 'mentoringLogin',
  });

  useEffect(() => {
    setTempSubject('');
    setTempQuestion('');
    setFirAbleTime('');
    setSecAbleTime('');
    setThiAbleTime('');
  }, []);

  useEffect(() => {
    const totalWidth =
      14 * koreanCharWidth * (major.length + postgradu.length + 3);
    if (totalWidth >= 208) setOverWidth(true);
  }, [major, postgradu]);

  useEffect(() => {
    const fetchSeniorInfo = async () => {
      setFindSeniorId(params.seniorId);
      const { data: seniorInfoFetchRes } = await getDetailSeniorInfoFetch({
        seniorId: params.seniorId,
      });
      if (findSuccessCode(seniorInfoFetchRes.code)) {
        const {
          isMine,
          info,
          keyword,
          lab,
          major,
          nickName,
          oneLiner,
          postgradu,
          professor,
          profile,
          term,
          times,
          certification,
        } = seniorInfoFetchRes.data;

        setMine(isMine);
        setInfo(info);
        setKeyword(keyword);
        setLab(lab);
        setMajor(major);
        setNickName(nickName);
        setOneLiner(oneLiner);
        setPostgradu(postgradu);
        setProfessor(professor);
        setProfile(profile);
        setTarget(target);
        setTerm(term);
        setTimes(times);
        setCertification(certification);
      }

      if (findExCode(seniorInfoFetchRes.code)) {
        //FIXME - 에러처리
      }
    };
    fetchSeniorInfo();
  }, []);

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

  return (
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
      {mine ? (
        <MentoringApplyBtn onClick={editHandler}>수정하기</MentoringApplyBtn>
      ) : (
        <>
          <MentoringApplyBtn onClick={applyHandler}>
            멘토링 신청
          </MentoringApplyBtn>
        </>
      )}
    </SeniorInfoPageContainer>
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

export default SeniorInfoPage;
