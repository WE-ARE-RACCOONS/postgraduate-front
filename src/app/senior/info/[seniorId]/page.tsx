'use client';
import IntroCard from "@/components/Card/IntroCard";
import KeywordCard from "@/components/Card/KeywordCard";
import ProfileCard from "@/components/Card/ProfileCard";
import BackHeader from "@/components/Header/BackHeader";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

function SeniorInfoPage() {
  const currentPath = usePathname();
  const pathArr = currentPath.split('/');
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
    axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/senior/${seniorId}`)
    .then((response) => {
      const res = response.data;

      if(res.code == "SNR200") {
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
    })
  }, []);

  return(
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
              professor={professor} />
          </div>
          <div id="keyword-card-wrapper">
            <KeywordCard lab={lab} keyword={keyword} />
          </div>
          <div id="intro-card-wrapper">
            <IntroCard oneLiner={oneLiner} info={info} target={target} times={times} />
          </div>
        </SeniorInfoContent>
      </SeniorInfoContentWrapper>
    </SeniorInfoPageContainer>
  )
}

const SeniorInfoPageContainer = styled.div`
  width: inherit;
  height: 100%;
  position: relative;
`

const SeniorInfoContentWrapper = styled.div`
  width: inherit;
  height: 100%;
  background-color: #f1f3f5;
  position: relative;
`

const SeniorInfoContent = styled.div`
  width: 95%;
  height: max-content;
  position: absolute;
  top: 1.56rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;

  #profile-card-wrapper {
    width: 100%;
    height: 7.25rem;
    margin-bottom: 0.625rem;
    
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
`

export default SeniorInfoPage;