'use client';
import React, { useEffect } from 'react';
import {
  ConfirmBox,
  ConfirmProfile,
  ConfirmInfo,
  ConfirmState,
  ConfirmContent,
  ConfirmTitle,
  UserInfo,
  DateExpect,
  Color,
  DateDone,
  RemainFont,
  MRFont,
  STDday,
  STDDexpect,
  MASalaryBox,
  MASalaryBoxY,
} from './MentoringApply.styled';
import Image from 'next/image';
import { useAtomValue } from 'jotai';
import { activeTabAtom } from '@/stores/tap';
import { TAB } from '@/constants/tab/ctap';
import KakaoOpenChat from '@/components/domain/mentoring/KakaoOpenChat/KakaoOpenChat';
import useAuth from '@/hooks/useAuth';
import state_n from '../../../../../public/cState_n.png';
import state_y from '../../../../../public/cState.png';
import type { MentoringApplyProps } from '@/types/mentoring/mentoring';
function MentoringApply({ data }: MentoringApplyProps) {
  const activeTab = useAtomValue(activeTabAtom);
  const dataSplit = data ? data.date : '';
  const salarySplit = data ? data.salaryDate : '';
  const dateParts = (dataSplit || '').split('-');
  const salParts = (salarySplit || '').split('-');
  const hour = parseInt(dateParts[3], 10);
  const period = hour >= 12 ? '오후' : '오전';
  const formattedHour = hour > 12 ? hour - 12 : hour;
  const dateExpected = `${dateParts[1]}월 ${dateParts[2]}일 ${period} ${formattedHour}시 ${dateParts[4]}분`;
  const dateDone = `${dateParts[1]}월 ${dateParts[2]}일 ${period} ${formattedHour}시 ${dateParts[4]}분`;
  const dateSalary = `${salParts[1]}월 ${salParts[2]}일`;
  const { getUserType } = useAuth();
  const userType = getUserType();
  const formatRemainTime = (remainTime: string) => {
    if (!remainTime) return '0시간 0분';
    const splittedTime = remainTime.split('-');
    return `${splittedTime[0]}시간 ${splittedTime[1]}분 `;
  };

  const formatDday = (date: string) => {
    const mentoringDate = convertDateType(date);
    const today = new Date();

    const dayDiff = mentoringDate.getDate() - today.getDate();
    const monthDiff = mentoringDate.getMonth() - today.getMonth();
    const yearDiff = mentoringDate.getFullYear() - today.getFullYear();

    const finalDiff = dayDiff + monthDiff * 30 + yearDiff * 365;

    if (finalDiff > 0) return `D-${Math.abs(finalDiff)}`;
    if (finalDiff == 0) return `D-day`;
    if (finalDiff < 0) return `D+${Math.abs(finalDiff)}`;
  };

  const convertDateType = (date: string) => {
    if (!date) return new Date();
    const parts = date.split('-');
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const day = parseInt(parts[2]);
    const hour = parseInt(parts[3]);
    const minute = parseInt(parts[4]);

    const newDate = new Date(year, month, day, hour, minute);
    return newDate;
  };

  return (
    <div>
      <ConfirmBox>
        <ConfirmContent $isjunior={userType === 'junior'}>
          <div style={{ display: 'flex' }}>
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
              {userType === 'senior' && (
                <>
                  {activeTab === TAB.waiting && (
                    <MRFont>
                      <div style={{ display: 'flex' }}>
                        <RemainFont>
                          {data && formatRemainTime(data.remainTime)}
                        </RemainFont>
                        &nbsp;후에 자동취소!
                      </div>
                      <div>지금 수락하세요!</div>
                    </MRFont>
                  )}

                  {activeTab === TAB.expected && (
                    <div style={{ display: 'flex', marginTop: '0.5rem' }}>
                      <STDday>{data && formatDday(data.date)}</STDday>
                      <STDDexpect>{dateExpected}</STDDexpect>
                    </div>
                  )}
                  {activeTab === TAB.done && (
                    <div style={{ display: 'flex', marginTop: '0.5rem' }}>
                      <STDday>{data && formatDday(data.date)}</STDday>
                      <STDDexpect>{dateDone}</STDDexpect>
                    </div>
                  )}
                </>
              )}
            </ConfirmInfo>
          </div>
          <ConfirmState>{data ? data.term : ''}분</ConfirmState>
        </ConfirmContent>

        {userType === 'junior' && (
          <div style={{ margin: '1rem' }}>
            {activeTab === TAB.expected && (
              <>
                <DateExpect>
                  {dateExpected}
                  <Color>&nbsp;멘토링 예정</Color>
                </DateExpect>
                <KakaoOpenChat url={data ? data.chatLink : ''} />
              </>
            )}
            {activeTab === TAB.done && (
              <>
                <DateDone>
                  {dateDone}
                  <Color>&nbsp;멘토링 완료</Color>
                </DateDone>
                {/* <NaverPoint /> */}
              </>
            )}
          </div>
        )}
        {userType === 'senior' && (
          <>
            {activeTab === TAB.waiting && (
              <div>
                {/* {data ? data.remainTime : ''}후에 자동취소, 지금 수락하세요! */}
              </div>
            )}
            {activeTab === TAB.done ? (
              data && data.status ? (
                <>
                  <MASalaryBoxY>
                    <Image
                      src={state_y}
                      alt="state"
                      width={18}
                      height={18}
                      style={{ marginRight: '0.19rem' }}
                    />
                    {dateSalary} 정산완료
                  </MASalaryBoxY>
                </>
              ) : (
                <MASalaryBox>
                  <Image
                    src={state_n}
                    alt="no-state"
                    width={18}
                    height={18}
                    style={{ marginRight: '0.19rem' }}
                  />
                  {dateSalary} 정산예정
                </MASalaryBox>
              )
            ) : null}
          </>
        )}
      </ConfirmBox>
    </div>
  );
}

export default MentoringApply;
