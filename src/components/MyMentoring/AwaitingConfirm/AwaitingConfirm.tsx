import React from 'react';
import{
    AwaitingConfirmBox,
    AwaitingConfirmProfile,
    AwaitingConfirmInfo,
    AwaitingConfirmState,
    AwaitingConfirmContent,
    ConfirmTitle,
    UserInfo,
    AwaitingConfirmShow
} from './AwaitingConfirm.styled';

function AwaitingConfirm() {
  return (
    <div>
      <AwaitingConfirmBox>
        <AwaitingConfirmContent>
            <AwaitingConfirmProfile></AwaitingConfirmProfile>
            <AwaitingConfirmInfo>
                <ConfirmTitle>000선배와 멘토링</ConfirmTitle>
                <UserInfo>대학원 | 학과</UserInfo>
            </AwaitingConfirmInfo>
            <AwaitingConfirmState>40분</AwaitingConfirmState>
        </AwaitingConfirmContent>
        <AwaitingConfirmShow>신청서 보기</AwaitingConfirmShow>
      </AwaitingConfirmBox>
    </div>
  )
}

export default AwaitingConfirm
