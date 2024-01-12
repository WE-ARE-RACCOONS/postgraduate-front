'use client';
import ProgressBar from "@/components/Bar/ProgressBar";
import BackHeader from "@/components/Header/BackHeader";
import RoundedImage from "@/components/Image/RoundedImage";
import styled from "styled-components";
import user_icon from '../../../../../public/user.png';
import AuthLabeledText from "@/components/Text/AuthLabeledText";
import { useAtomValue } from "jotai";
import { firAbleTimeAtom, secAbleTimeAtom, thiAbleTimeAtom } from "@/stores/mentoring";
import { useEffect } from "react";
import { MENTORING_PAY_ETC_TEXT, MENTORING_PAY_PAYMENT_TEXT, MENTORING_PAY_TITLE } from "@/constants/pay/pay";

function MentoringApplyPayPage() {
  const firstTime = useAtomValue(firAbleTimeAtom);
  const secondTime = useAtomValue(secAbleTimeAtom);
  const thirdTime = useAtomValue(thiAbleTimeAtom);

  const formatTime = (time: string) => {
    if(!time) return '';

    let result = '';
    const timeArr = time.split('-');
    if(timeArr.length >= 5) {
      const month = Number(timeArr[1]);
      const date = Number(timeArr[2]);
      const hour = timeArr[3];
      const min = timeArr[4];

      result += `${month}월 `;
      result += `${date}일 `;
      result += (Number(min) == 0) ? `${hour}시 00분 ~ ${hour}시 30분` : `${hour}시 30분 ~ ${Number(hour) + 1}시 00분`;
      return result;
    } else return '';
  }

  return (
    <MAPContainer>
      <BackHeader headerText="멘토링 결제 정보" />
      <ProgressBar activeNum={2} />
      <MAPContent>
        <MAPTitle id="map-title-senior-info">{MENTORING_PAY_TITLE.seniorInfo}</MAPTitle>
        <MAPBox>
          <MAPInfoWrapper>
            <RoundedImage imgSrc={user_icon} altMsg="대학원생 프로필 이미지" />
            <div id="map-info-text">
              <div id="map-info-postgradu-major">
                <div id="map-info-postgradu">카이스트&nbsp;</div>
                <div id="map-info-major">인공지능융합과</div>
              </div>
              <AuthLabeledText str="김도민님" />
              <div id="map-info-lab">Computer Systems and Intelligence</div>
            </div>
          </MAPInfoWrapper>
        </MAPBox>
        <MAPBox>
          <MAPTimeWrapper>
            <MAPTitle>{MENTORING_PAY_TITLE.schedule}</MAPTitle>
            <div id="map-time-list">
              <ol>
                <li>
                  <div className="map-text">첫{MENTORING_PAY_ETC_TEXT.nthSchedule}</div>
                  <div className="map-value">{formatTime(firstTime)}</div>
                </li>
                <li>
                  <div className="map-text">두{MENTORING_PAY_ETC_TEXT.nthSchedule}</div>
                  <div className="map-value">{formatTime(secondTime)}</div>
                </li>
                <li>
                  <div className="map-text">세{MENTORING_PAY_ETC_TEXT.nthSchedule}</div>
                  <div className="map-value">{formatTime(thirdTime)}</div>
                </li>
              </ol>
            </div>
          </MAPTimeWrapper>
        </MAPBox>
        <MAPBox>
          <MAPPayWrapper>
            <MAPTitle>{MENTORING_PAY_TITLE.payAmount}</MAPTitle>
            <div id="map-pay-time-container">
              <div className="map-text">{MENTORING_PAY_PAYMENT_TEXT.timeText}</div>
              <div className="map-value">{MENTORING_PAY_PAYMENT_TEXT.timeValue}</div>
            </div>
            <div id="map-pay-amount-container">
              <div id="map-pay-amount-text">{MENTORING_PAY_PAYMENT_TEXT.amountText}</div>
              <div id="map-pay-amount-value">{MENTORING_PAY_PAYMENT_TEXT.amountValue}</div>
            </div>
          </MAPPayWrapper>
        </MAPBox>
      </MAPContent>
    </MAPContainer>
  );
}

const MAPContainer = styled.div`
  width: inherit;
  height: 100%;
  position: relative;
  background-color: #F8F9FA;
  padding-bottom: 4.375rem;
`

const MAPContent = styled.div`
  width: 95%;
  margin: 0 auto;
  margin-top: 1.5rem;

  #map-title-senior-info {
    margin-bottom: 0.5rem;
  }
`

const MAPTitle = styled.div`
  width: 90%;
  height: 1.375rem;
  font-weight: 700;
`

const MAPBox = styled.div`
  width: 100%;
  height: max-content;
  border-radius: 8px;
  background-color: #FFF;
  padding: 1rem;
  margin-bottom: 0.75rem;
  border: 1px solid #000;

  .map-text {
    color: #868E96;
    margin-right: 2.375rem;
    font-size: 14px;
  }

  .map-value {
    font-size: 14px;
  }
`

const MAPInfoWrapper = styled.div`
  width: 100%;
  display: flex;

  #map-info-text {
    width: 70%;
    height: 4.07rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 1rem;

    #map-info-postgradu-major {
      width: max-content;
      height: 1.07rem;
      font-size: 12px;
      display: flex;
      color: #868E96;
    }

    #map-info-lab {
      font-size: 12px;
      color: #212529;
    }
  }
`

const MAPTimeWrapper = styled.div`
  width: 100%;

  ol {
    list-style: none;
    font-size: 14px;
    width: 90%;
    height: 4.69rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 0.32rem;
  }

  li {
    display: flex;
    white-space: nowrap;
  }

`

const MAPPayWrapper = styled.div`
  width: 100%;

  #map-pay-time-container {
    width: 100%;
    height: 1.5rem;
    border-bottom: 1px solid #DEE2E6;
    display: flex;
    justify-content: space-between;
    margin-top: 0.875rem;
  }

  #map-pay-amount-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    letter-spacing: -0.5px;
    margin-top: 0.875rem;

    #map-pay-amount-value {
      font-size: 18px;
      color: #2FC4B2;
      font-weight: 700;
    }
  }
`

export default MentoringApplyPayPage;
