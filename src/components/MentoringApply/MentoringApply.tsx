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

function MentoringApply() {
  return (
    <div>
      <ConfirmBox>
        <ConfirmContent>
          <ConfirmProfile></ConfirmProfile>
          <ConfirmInfo>
            <ConfirmTitle>000선배와 멘토링</ConfirmTitle>
            <UserInfo>대학원 | 학과</UserInfo>
          </ConfirmInfo>
          <ConfirmState>40분</ConfirmState>
        </ConfirmContent>
        <ConfirmShow>신청서 보기</ConfirmShow>
      </ConfirmBox>
    </div>
  );
}

export default MentoringApply;
