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
            src={data?.profile ? data.profile : '/user.png'}
          ></ConfirmProfile>
          <ConfirmInfo>
            <ConfirmTitle>{data?.nickName}선배와 멘토링</ConfirmTitle>
            <UserInfo>
              {data?.postgradu} | {data?.major}{' '}
            </UserInfo>
          </ConfirmInfo>
          <ConfirmState>{data?.term} 분</ConfirmState>
        </ConfirmContent>
        <ConfirmShow>신청서 보기</ConfirmShow>
      </ConfirmBox>
    </div>
  );
}

export default MentoringApply;
