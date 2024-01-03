'use client';
import IntroCard from '@/components/Card/IntroCard';
import KeywordCard from '@/components/Card/KeywordCard';
import ProfileCard from '@/components/Card/ProfileCard';
import BackHeader from '@/components/Header/BackHeader';
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

function SeniorInfoPage() {
  const router = useRouter();
  const currentPath = usePathname();
  const pathArr = currentPath.split('/');

  const { getAccessToken } = useAuth();

  const [info, setInfo] = useState('');
  const [keyword, setKeyword] = useState([]);
  const [lab, setLab] = useState('');
  const [major, setMajor] = useState('');
  const [nickName, setNickName] = useState('');
  const [oneLiner, setOneLiner] = useState('');
  const [postgardu, setPostgradu] = useState('');
  const [professor, setProfessor] = useState('');
  const [profile, setProfile] = useState('');
  const [target, setTarget] = useState('');
  const [term, setTerm] = useState(40);
  const [times, setTimes] = useState([]);

  useEffect(() => {
    const seniorId = pathArr[pathArr.length - 1];
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/senior/${seniorId}`)
      .then((response) => {
        const res = response.data;

        if (res.code == 'SNR200') {
          setInfo(res.data.info);
          setKeyword(res.data.keyword);
          setLab(res.data.lab);
          setMajor(res.data.major);
          setNickName(res.data.nickName);
          setOneLiner(res.data.oneLiner);
          setPostgradu(res.data.postgradu);
          setProfessor(res.data.professor);
          setProfile(res.data.profile);
          setTarget(res.data.target);
          setTerm(res.data.term);
          setTimes(res.data.times);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const applyHandler = () => {
    const accessTkn = getAccessToken();
    const seniorId = pathArr[pathArr.length - 1];
    /** user type 확인하는 부분 추가 */
    if (accessTkn) {
      router.push(`/mentoring-apply/${seniorId}/question`);
    }
  };

  return (
    <SeniorInfoPageContainer>
      <BackHeader headerText="멘토 선배 소개" />
      <SeniorInfoContentWrapper>
        <SeniorInfoContent>
          <div id="profile-card-wrapper">
            <ProfileCard
              profile={profile}
              nickname={nickName}
              term={term}
              postgradu={postgardu}
              major={major}
              professor={professor}
            />
          </div>
          <div id="keyword-card-wrapper">
            <KeywordCard lab={lab} keyword={keyword} />
          </div>
          <div id="intro-card-wrapper">
            <IntroCard
              oneLiner={oneLiner}
              info={info}
              target={target}
              times={times}
            />
          </div>
        </SeniorInfoContent>
      </SeniorInfoContentWrapper>
      <MentoringApplyBtn onClick={applyHandler}>멘토링 신청</MentoringApplyBtn>
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
  background-color: #f1f3f5;
  position: relative;
  padding-bottom: 4.5rem;
`;

const SeniorInfoContent = styled.div`
  width: 95%;
  height: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  #profile-card-wrapper {
    width: 100%;
    height: 7.25rem;
    margin: 1.5rem 0 0.625rem 0;
  }

  #keyword-card-wrapper {
    width: 100%;
    height: max-content;
    margin-bottom: 0.625rem;
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

  @media (min-width: 600px) {
    width: 34rem;
  }
`;

export default SeniorInfoPage;