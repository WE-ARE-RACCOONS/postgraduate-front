'use client';
import React, { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import useModal from '@/hooks/useModal';
import { MentoringSpecData } from '@/types/mentoring/mentoring';
import TextToggleButton from '../../../TextToggleButton/TextToggleButton';
import MentoringApply from '../../MentoringApply/MentoringApply';
import { ModalMentoringProps } from '@/types/modal/mentoringDetail';
import Image from 'next/image';
import x_icon from '../../../../../public/x.png';
import {
  ModalMentoringBackground,
  ModalClose,
  Color,
  MNick,
  MApplyBox,
  MMainFont,
  MsubFont,
  Mmargin,
  ConfirmContent,
  ConfirmProfile,
  ConfirmInfo,
  ConfirmTitle,
  UserInfo,
  ConfirmState,
  MMTop,
} from './MentoringSpec.styled';

import ApplyCancleBtn from '../../../Button/ApplyCancleBtn/ApplyCancleBtn';
import { useAtom } from 'jotai';
import { activeTabAtom } from '@/stores/tap';
import { TAB } from '@/constants/tab/ctap';
import { useRouter } from 'next/navigation';
import findExCode from '@/utils/findExCode';
function MentoringSpec(props: ModalMentoringProps) {
  const { getAccessToken, getUserType, removeTokens } = useAuth();
  const [data, setData] = useState<MentoringSpecData | null>(null);
  const userType = getUserType();
  const router = useRouter();
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);

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

  useEffect(() => {
    if (props.mentoringId !== 0) {
      getAccessToken().then((Token) => {
        if (Token) {
          const headers = {
            Authorization: `Bearer ${Token}`,
          };
          axios
            .get(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/mentoring/me/${props.mentoringId}`,
              {
                headers,
              },
            )
            .then((response) => {
              if (findExCode(response.data.code)) {
                removeTokens();
                location.reload();
                return;
              }

              setData(response.data.data);
            })
            .catch((error) => {
              console.error('Error fetching data:', error);
            });
        }
      });
    }
  }, []);
  return (
    <ModalMentoringBackground>
      <MMTop>
        <div id="header-text">멘토링 신청서</div>
        <div id="img">
          <Image
            id="x-icon"
            src={x_icon}
            alt="계정 수정 모달 닫기 버튼"
            width={24}
            height={24}
            style={{}}
            onClick={props.modalHandler}
          />
        </div>
      </MMTop>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '1rem',
        }}
      >
        <MNick>
          {data ? data.nickName : ''}
          <Color>&nbsp;에게 보낸 신청서</Color>
        </MNick>
        {activeTab === TAB.waiting ? (
          <ApplyCancleBtn
            kind="jcancel"
            btnText={'취소하기'}
            cancelModalHandler={props.cancelModalHandler}
            // modalHandler={props.modalHandler}
            mentoringId={props.mentoringId}
          />
        ) : (
          ''
        )}
      </div>
      <MApplyBox>
        <ConfirmContent>
          <ConfirmProfile
            src={data ? data.profile : '/user.png'}
          ></ConfirmProfile>
          <ConfirmInfo>
            <ConfirmTitle>
              {data ? data.nickName : ''}&nbsp;
              {userType === 'senior' ? '후배와 멘토링' : '선배와 멘토링'}
            </ConfirmTitle>
            {userType === 'junior' && (
              <>
                <UserInfo>
                  {data ? data.postgradu : ''} {data ? data.major : ''}
                  <br />
                  {data ? data.lab : ''}
                </UserInfo>
              </>
            )}
          </ConfirmInfo>
        </ConfirmContent>
      </MApplyBox>
      <div style={{ display: 'flex', padding: '1.56rem 1rem' }}>
        <MMainFont>신청 일정&nbsp;</MMainFont>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <MsubFont>3개의 일정 중 하나로 확정 됩니다</MsubFont>
        </div>
      </div>
      <div>
        {data &&
          data.dates &&
          data.dates.length > 0 &&
          data.dates.map((date, index) => (
            <TextToggleButton key={index} text={formatTime(date)} />
          ))}
      </div>
      <Mmargin>
        <MMainFont>멘토링 주제</MMainFont>
      </Mmargin>
      <div>
        <TextToggleButton text={data ? data.topic : ''} />
      </div>
      <Mmargin>
        <MMainFont>사전 질문</MMainFont>
      </Mmargin>
      <div>
        <TextToggleButton text={data ? data.question : ''} />
      </div>
      <div style={{ marginBottom: '7rem' }}>
        <ModalClose onClick={props.modalHandler}>확인 완료</ModalClose>
      </div>
    </ModalMentoringBackground>
  );
}

export default MentoringSpec;
