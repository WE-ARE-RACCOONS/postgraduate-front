'use client';
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
      </SeniorInfoContent>
    </SeniorInfoPageContainer>
  )
}

const SeniorInfoPageContainer = styled.div`
  width: inherit;
  height: 100%;
  position: relative;
`

const SeniorInfoContent = styled.div`
  width: inherit;
  height: 100%;
  background-color: #f1f3f5;
  position: relative;

  #profile-card-wrapper {
    position: absolute;
    width: 95%;
    height: 7.25rem;
    top: 1.56rem;
    left: 50%;
    transform: translateX(-50%);
  }

  #keyword-card-wrapper {
    position: absolute;
    width: 95%;
    height: max-content;
    top: 9.44rem;
    left: 50%;
    transform: translateX(-50%);
  }
`

export default SeniorInfoPage;