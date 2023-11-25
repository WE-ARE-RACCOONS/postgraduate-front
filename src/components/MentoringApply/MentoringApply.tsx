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
import { useAtomValue } from 'jotai';
import { activeTabAtom } from '@/stores/tap';
import { TAB } from '@/constant/tab/ctap'

function MentoringApply({ data }: MentoringApplyProps) {
  const activeTab = useAtomValue(activeTabAtom);
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
          {activeTab === TAB.expected && <KakaoOpenChat />}
          <ConfirmState>{data ? data.term : ''} 분</ConfirmState>
        </ConfirmContent>

        <ConfirmShow>신청서 보기</ConfirmShow>
      </ConfirmBox>
    </div>
  );
}

export default MentoringApply;
