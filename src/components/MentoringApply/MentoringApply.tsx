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
  ConfirmShow,
} from './MentoringApply.styled';
import { MentoringApplyProps } from '@/types/mentoring/mentoring';

function MentoringApply({ data }: MentoringApplyProps) {
  return (
    <div>
      <ConfirmBox>
        <ConfirmContent>
          <ConfirmProfile
            src={data ? data.profile : '/user.png'}
          ></ConfirmProfile>
          <ConfirmInfo>
            <ConfirmTitle>{data ? data.nickName : ''}선배와 멘토링</ConfirmTitle>
            <UserInfo>
              {data ? data.postgradu : ''} | {data ? data.major : ''}
            </UserInfo>
          </ConfirmInfo>
          <ConfirmState>{data ? data.term : ''} 분</ConfirmState>
        </ConfirmContent>
        <ConfirmShow>신청서 보기</ConfirmShow>
      </ConfirmBox>
    </div>
  );
}

export default MentoringApply;
