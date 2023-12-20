'use client';
import SalaryBox from "@/components/Box/SalaryBox";
import React,{useEffect, useState} from "react";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import styled from "styled-components";
import { tapType } from "@/types/tap/tap";
import { TAB, STAB_STATE } from "@/constants/tab/ctap";
import SalaryProfile from "@/components/Profile/salaryProfile/salaryProfile";

function SalaryPage() {
  const { getAccessToken, getUserType } = useAuth();
  const Token = getAccessToken();
  const userType = getUserType();
  const [data, setData] = useState([]);
  const [salaryDate, setSalaryDate] = useState('');
  const [salaryAmount, setSalaryAmount] = useState(0);
  const [activeTab, setActiveTab] = useState(TAB.waiting)
  const handleTabClick = (tabIndex: tapType) => {
    setActiveTab(tabIndex);
  };
  useEffect(() => {
    if (Token) {
      const headers = {
        Authorization: `Bearer ${Token}`,
      };
      if (userType == 'senior') {
        axios
          .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/salary/${activeTab}`, { headers })
          .then((res) => {
            console.log(res.data)
            if (res.data.code == 'SLR200') {
              setData(res.data.data.salaryDetails);
            }
           
          })
          .catch(function (error) {
            console.log(error);
          });
          axios
          .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/salary`, { headers })
          .then((res) => {
            if (res.data.code == 'SLR200') {
              setSalaryDate(res.data.data.salaryDate);
              setSalaryAmount(res.data.data.salaryAmount);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  }, [Token,activeTab]);
  const renderTabContent = () => {
    return(
      <div>
      {data && data.length > 0 ? (
        <div>
          {data.map((el, idx) => (
            <div key={idx}>
              <SalaryProfile data={el} />
            </div>
          ))}
        </div>
      ) : (
        <div>{`${STAB_STATE[activeTab]}인 멘토링이 없어요`}</div>
      )}
    </div>
    )
      
  };
  console.log(salaryDate)
  return (
    <>
  <div> 
    <SalaryBox salaryDate={salaryDate} salaryAmount={salaryAmount} />
  </div>
  <div style={{ display: 'flex' }}>
  <TapStyle onClick={() => handleTabClick('waiting')}>정산예정</TapStyle>
  <TapStyle onClick={() => handleTabClick('done')}>정산완료</TapStyle>
</div>
<div>{renderTabContent()}</div>
</>);
}
const TapStyle = styled.div`
border: 1px solid blue;
  
`;

export default SalaryPage;
