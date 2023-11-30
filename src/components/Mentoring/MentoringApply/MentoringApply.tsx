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
} from './MentoringApply.styled';
import { MentoringApplyProps } from '@/types/mentoring/mentoring';
import { useAtomValue } from 'jotai';
import { activeTabAtom } from '@/stores/tap';
import { TAB } from '@/constant/tab/ctap';
import KakaoOpenChat from '../../KakaoOpenChat/KakaoOpenChat';
import NaverPoint from '../../NaverPoint/NaverPoint';

function MentoringApply({ data }: MentoringApplyProps) {
  const activeTab = useAtomValue(activeTabAtom);
  const datasplit = data ? data.date : '';
  const dateParts = (datasplit || '').split('-');
  const dateExpected = `${dateParts[1]}월 ${dateParts[2]}일 ${dateParts[3]}시 ${dateParts[4]}분`;
  const dateDone = `${dateParts[1]}월 ${dateParts[2]}일 완료`;
  return (
    <div>
      <ConfirmBox>
        <ConfirmContent>
          <ConfirmProfile
            src={data ? data.profile : '/user.png'}
          ></ConfirmProfile>
          <ConfirmInfo>
            <ConfirmTitle>
              {data ? data.nickName : ''}선배와 멘토링
            </ConfirmTitle>
            <UserInfo>
              {data ? data.postgradu : ''} | {data ? data.major : ''}
            </UserInfo>
            {activeTab === TAB.expected && dateExpected}
            {activeTab === TAB.done && dateDone}
          </ConfirmInfo>
          <ConfirmState>{data ? data.term : ''} 분</ConfirmState>
        </ConfirmContent>
        {activeTab === TAB.expected && (
          <KakaoOpenChat url={data ? data.chatLink : ''} />
        )}
        {activeTab === TAB.done && <NaverPoint />}
      </ConfirmBox>
    </div>
  );
}

export default MentoringApply;
