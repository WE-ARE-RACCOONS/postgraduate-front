'use client';
import ProgressBar from '@/components/Bar/ProgressBar';
import BackHeader from '@/components/Header/BackHeader';
import RoundedImage from '@/components/Image/RoundedImage';
import styled from 'styled-components';
import user_icon from '../../../../../public/user.png';
import AuthLabeledText from '@/components/Text/AuthLabeledText';
import { useAtomValue } from 'jotai';
import {
  firAbleTimeAtom,
  questionAtom,
  secAbleTimeAtom,
  subjectAtom,
  thiAbleTimeAtom,
} from '@/stores/mentoring';
import {
  MENTORING_PAY_ETC_TEXT,
  MENTORING_PAY_NOTICE_TEXT,
  MENTORING_PAY_PAYMENT_TEXT,
  MENTORING_PAY_TITLE,
} from '@/constants/mentoring/pay';
import Image from 'next/image';
import mint_check from '../../../../../public/mint_check.png';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import { TEMRS_LINK } from '@/constants/terms/terms';

function MentoringApplyPayPage() {
  const [nickName, setNickName] = useState('');
  const [profile, setProfile] = useState('');
  const [postgradu, setPostgradu] = useState('');
  const [major, setMajor] = useState('');
  const [lab, setLab] = useState('');
  const topic = useAtomValue(subjectAtom);
  const question = useAtomValue(questionAtom);
  const firstTime = useAtomValue(firAbleTimeAtom);
  const secondTime = useAtomValue(secAbleTimeAtom);
  const thirdTime = useAtomValue(thiAbleTimeAtom);
  const router = useRouter();
  const currentPath = usePathname();
  const pathArr = currentPath.split('/');
  const seniorId = pathArr[2];
  const { getAccessToken } = useAuth();

  const formatTime = (time: string) => {
    if (!time) return '';

    let result = '';
    const timeArr = time.split('-');
    if (timeArr.length >= 5) {
      const month = Number(timeArr[1]);
      const date = Number(timeArr[2]);
      const hour = timeArr[3];
      const min = timeArr[4];

      result += `${month}월 `;
      result += `${date}일 `;
      result +=
        Number(min) == 0
          ? `${hour}시 00분 ~ ${hour}시 30분`
          : `${hour}시 30분 ~ ${Number(hour) + 1}시 00분`;
      return result;
    } else return '';
  };

  const payHandler = () => {
    /** 결제 연결 필요 */
    const accessTkn = getAccessToken();
    if (
      accessTkn &&
      topic &&
      question &&
      firstTime &&
      secondTime &&
      thirdTime
    ) {
      const timeArr = [firstTime, secondTime, thirdTime];

      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/mentoring/applying`,
          {
            seniorId: seniorId,
            topic: topic,
            question: question,
            date: timeArr.join(','),
          },
          {
            headers: {
              Authorization: `Bearer ${accessTkn}`,
            },
          },
        )
        .then((response) => {
          const res = response.data;
          if (res.code == 'MT202') {
            router.push('/mentoring-apply/done');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    const accessTkn = getAccessToken();
    if (accessTkn) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/senior/${seniorId}/profile`,
          {
            headers: {
              Authorization: `Bearer ${accessTkn}`,
            },
          },
        )
        .then((response) => {
          const res = response.data;
          if (res.code && res.code == 'SNR200') {
            setNickName(res.data.nickName);
            setProfile(res.data.profile);
            setPostgradu(res.data.postgradu);
            setMajor(res.data.major);
            setLab(res.data.lab);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  return (
    <MAPContainer>
      <BackHeader headerText="멘토링 결제 정보" />
      <ProgressBar activeNum={2} />
      <MAPContent>
        <MAPTitle id="map-title-senior-info">
          {MENTORING_PAY_TITLE.seniorInfo}
        </MAPTitle>
        <MAPBox>
          <MAPInfoWrapper>
            <RoundedImage
              imgSrc={profile ? profile : user_icon}
              altMsg="대학원생 프로필 이미지"
            />
            <div id="map-info-text">
              <div id="map-info-postgradu-major">
                <div id="map-info-postgradu">{postgradu}&nbsp;</div>
                <div id="map-info-major">{major}</div>
              </div>
              <AuthLabeledText str={`${nickName}님`} />
              <div id="map-info-lab">{lab}</div>
            </div>
          </MAPInfoWrapper>
        </MAPBox>
        <MAPBox>
          <MAPTimeWrapper>
            <MAPTitle>{MENTORING_PAY_TITLE.schedule}</MAPTitle>
            <div id="map-time-list">
              <ol>
                <li>
                  <div className="map-text">
                    첫{MENTORING_PAY_ETC_TEXT.nthSchedule}
                  </div>
                  <div className="map-value">{formatTime(firstTime)}</div>
                </li>
                <li>
                  <div className="map-text">
                    두{MENTORING_PAY_ETC_TEXT.nthSchedule}
                  </div>
                  <div className="map-value">{formatTime(secondTime)}</div>
                </li>
                <li>
                  <div className="map-text">
                    세{MENTORING_PAY_ETC_TEXT.nthSchedule}
                  </div>
                  <div className="map-value">{formatTime(thirdTime)}</div>
                </li>
              </ol>
            </div>
          </MAPTimeWrapper>
        </MAPBox>
        <MAPBox>
          <MAPPayAmountWrapper>
            <MAPTitle>{MENTORING_PAY_TITLE.payAmount}</MAPTitle>
            <div id="map-pay-time-container">
              <div className="map-text">
                {MENTORING_PAY_PAYMENT_TEXT.timeText}
              </div>
              <div className="map-value">
                {MENTORING_PAY_PAYMENT_TEXT.timeValue}
              </div>
            </div>
            <div id="map-pay-amount-container">
              <div id="map-pay-amount-text">
                {MENTORING_PAY_PAYMENT_TEXT.amountText}
              </div>
              <div id="map-pay-amount-value">
                {MENTORING_PAY_PAYMENT_TEXT.amountValue}
              </div>
            </div>
          </MAPPayAmountWrapper>
        </MAPBox>
        <MAPBox>
          <MAPPayMethodWrapper>
            <MAPTitle>{MENTORING_PAY_TITLE.payMethod}</MAPTitle>
            <div id="map-pay-method-container">
              <Image
                id="map-pay-method-check"
                src={mint_check}
                alt="체크 표시"
              />
              <div id="map-pay-method-text">
                {MENTORING_PAY_PAYMENT_TEXT.methodText}
              </div>
            </div>
          </MAPPayMethodWrapper>
        </MAPBox>
        <MAPNoticeWrapper>
          <MAPTitle>{MENTORING_PAY_TITLE.notice}</MAPTitle>
          <ul>
            <li>{MENTORING_PAY_NOTICE_TEXT.scheduleChange}</li>
            <li>{MENTORING_PAY_NOTICE_TEXT.reject}</li>
            <li>{MENTORING_PAY_NOTICE_TEXT.cancelChange}</li>
            <li>{MENTORING_PAY_NOTICE_TEXT.noResponse}</li>
          </ul>
        </MAPNoticeWrapper>
        <MAPPolicyWrapper>
          <MAPTitle>{MENTORING_PAY_TITLE.noShow}</MAPTitle>
          <button
            className="policy-more-detail"
            onClick={() => {
              if (typeof window !== undefined)
                window.open(
                  TEMRS_LINK.noShowPolicy,
                  '_blank',
                  'noopener, noreferrer',
                );
            }}
          >
            자세히 알아보기
          </button>
        </MAPPolicyWrapper>
        <MAPPolicyWrapper>
          <MAPTitle>{MENTORING_PAY_TITLE.refund}</MAPTitle>
          <button
            className="policy-more-detail"
            onClick={() => {
              if (typeof window !== undefined)
                window.open(
                  TEMRS_LINK.refundPolicy,
                  '_blank',
                  'noopener, noreferrer',
                );
            }}
          >
            자세히 알아보기
          </button>
        </MAPPolicyWrapper>
      </MAPContent>
      <MAPBtnContainer>
        <button
          id="map-prev-btn"
          className="map-btn"
          onClick={() => {
            router.back();
          }}
        >
          이전
        </button>
        <button id="map-next-btn" className="map-btn" onClick={payHandler}>
          결제하기
        </button>
      </MAPBtnContainer>
    </MAPContainer>
  );
}

const MAPContainer = styled.div`
  width: inherit;
  height: 100%;
  position: relative;
  background-color: #f8f9fa;
  padding-bottom: 4.375rem;
`;

const MAPContent = styled.div`
  width: 95%;
  margin: 0 auto;
  margin-top: 1.5rem;

  #map-title-senior-info {
    margin-bottom: 0.5rem;
  }
`;

const MAPTitle = styled.div`
  width: max-content;
  height: 1.375rem;
  font-weight: 700;
`;

const MAPBox = styled.div`
  width: 100%;
  height: max-content;
  border-radius: 8px;
  background-color: #fff;
  padding: 1rem;
  margin-bottom: 0.75rem;

  .map-text {
    color: #868e96;
    margin-right: 2.375rem;
    font-size: 14px;
  }

  .map-value {
    font-size: 14px;
  }
`;

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
      color: #868e96;
    }

    #map-info-lab {
      font-size: 12px;
      color: #212529;
    }
  }
`;

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
`;

const MAPPayAmountWrapper = styled.div`
  width: 100%;

  #map-pay-time-container {
    width: 100%;
    height: 1.5rem;
    border-bottom: 1px solid #dee2e6;
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
      color: #2fc4b2;
      font-weight: 700;
    }
  }
`;

const MAPPayMethodWrapper = styled.div`
  width: 100%;

  #map-pay-method-container {
    display: flex;
    justify-content: space-between;
    width: 6.57rem;
    align-items: center;
    margin-top: 0.875rem;

    #map-pay-method-check {
      width: 0.875rem;
      height: 0.625rem;
    }

    #map-pay-method-text {
      font-size: 14px;
    }
  }
`;

const MAPNoticeWrapper = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  padding-bottom: 0.75rem;

  ul {
    width: 95%;
    color: #868e96;
    font-size: 14px;
    padding-left: 1rem;
    margin-top: 0.7rem;
    line-height: 140%;
  }

  li:last-child {
    text-decoration-line: underline;
  }
`;

const MAPPolicyWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 0.75rem;

  .policy-more-detail {
    border: none;
    background-color: transparent;
    color: #868e96;
    font-size: 14px;
    font-family: Pretendard;
    text-decoration-line: underline;
    cursor: pointer;
  }
`;

const MAPBtnContainer = styled.div`
  width: 93%;
  height: 3.375rem;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 4.375rem;

  .map-btn {
    font-size: 18px;
    color: #fff;
    font-family: Pretendard;
    border: none;
    font-weight: 700;
    height: 3.375rem;
    border-radius: 12px;
    cursor: pointer;
  }

  #map-prev-btn {
    width: 34%;
    background-color: #adb5bd;
  }

  #map-next-btn {
    width: 63%;
    background-color: #2fc4b2;
  }
`;

export default MentoringApplyPayPage;
