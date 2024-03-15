'use client';
import React from 'react';
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
import { activeTabAtom } from '../../../stores/tap';
import { TAB } from '../../../constants/tab/ctap';
import KakaoOpenChat from '../../KakaoOpenChat/KakaoOpenChat';
import NaverPoint from '../../NaverPoint/NaverPoint';
import useAuth from '../../../hooks/useAuth';
import state_n from '../../../../public/cState_n.png';
import state_y from '../../../../public/cState.png';
import { MentoringApplyProps } from '../../../types/mentoring/mentoring';
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
                        <RemainFont>{data && data.remainTime}</RemainFont>후에
                        자동취소!
                      </div>
                      <div>지금 수락하세요!</div>
                    </MRFont>
                  )}

                  {activeTab === TAB.expected && (
                    <div style={{ display: 'flex', marginTop: '0.5rem' }}>
                      <STDday>D-20</STDday>
                      <STDDexpect>{dateExpected}</STDDexpect>
                    </div>
                  )}
                  {activeTab === TAB.done && (
                    <div style={{ display: 'flex', marginTop: '0.5rem' }}>
                      <STDday>D-20</STDday>
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
