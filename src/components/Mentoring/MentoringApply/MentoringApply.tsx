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
  DateDone
} from './MentoringApply.styled';
import { useAtomValue } from 'jotai';
import { activeTabAtom } from '../../../stores/tap';
import { TAB } from '../../../constants/tab/ctap';
import KakaoOpenChat from '../../KakaoOpenChat/KakaoOpenChat';
import NaverPoint from '../../NaverPoint/NaverPoint';
import useAuth from '../../../hooks/useAuth';
import { MentoringApplyProps } from '../../../types/mentoring/mentoring';
function MentoringApply({ data }: MentoringApplyProps) {
  const activeTab = useAtomValue(activeTabAtom);
  const datasplit = data ? data.date : '';
  const dateParts = (datasplit || '').split('-');
  const dateExpected = `${dateParts[1]}월 ${dateParts[2]}일 ${dateParts[3]}시 ${dateParts[4]}분`;
  const dateDone = `${dateParts[1]}월 ${dateParts[2]}일 ${dateParts[3]}시 ${dateParts[4]}분`;
  const { getUserType } = useAuth();
  const userType = getUserType();
  return (
    <div>
      <ConfirmBox>
        <ConfirmContent>
          <ConfirmProfile
            src={data ? data.profile : '/user.png'}
          ></ConfirmProfile>
          <ConfirmInfo>
            <ConfirmTitle>
              {data ? data.nickName : ''}
              {userType === 'senior' ? '후배와 멘토링' : '선배와 멘토링'}
            </ConfirmTitle>
            {userType === 'junior' && (
              <>
                <UserInfo>
                  {data ? data.postgradu : ''} {data ? data.major : ''}<br/>
                  {data ? data.lab : ''}
                </UserInfo>
              </>
            )}
            {userType === 'senior' && (
              <>
                {activeTab === TAB.expected && dateExpected}
                {activeTab === TAB.done && dateDone}
              </>
            )}
          </ConfirmInfo>
          <ConfirmState>{data ? data.term : ''}분</ConfirmState>
        </ConfirmContent>
        {userType === 'junior' && (
          <div style={{margin:'1rem'}}>
          {activeTab === TAB.expected && (
            <>
              <DateExpect>{dateExpected}<Color> 멘토링 예정</Color></DateExpect>
              <KakaoOpenChat url={data ? data.chatLink : ''} />
            </>
          )}
          {activeTab === TAB.done && (
            <>
              <DateDone>{dateDone}<Color> 멘토링 예정</Color></DateDone>
              {/* <NaverPoint /> */}
            </>
          )}
          </div>
        )}
        {userType === 'senior' && (
          <>
            {activeTab === TAB.waiting && (
              <div>
                {data ? data.remainTime : ''}후에 자동취소, 지금 수락하세요!
              </div>
            )}
            {activeTab === TAB.done && (
              <div>{data ? data.salaryDate : ''} 정산예정</div>
            )}
          </>
        )}
      </ConfirmBox>
    </div>
  );
}

export default MentoringApply;
