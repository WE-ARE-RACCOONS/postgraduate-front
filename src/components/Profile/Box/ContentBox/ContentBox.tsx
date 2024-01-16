import React from 'react';
import { ContentWapper } from './ContentBox.styled';
import Image from 'next/image';
import arrow from '@/../../public/arrow-right.png';
import { certiRegType } from '@/types/profile/profile';
function setAuthText(auth: certiRegType) {
  switch (auth) {
    case 'APPROVE':
      return '승인 완료';
    case 'NOT_APPROVE':
      return '미승인';
    case 'WAITING':
      return '승인 대기중';
    default:
      return '';
  }
}
const ContentBox = ({
  content,
  onClick,
  kind,
  profileReg,
  certifiReg,
}: {
  certifiReg?: certiRegType;
  kind?: string;
  profileReg?: boolean;
  content: string;
  onClick?: () => void;
}) => {
  return (
    <ContentWapper onClick={onClick}>
      {content}
      <div style={{ display: 'flex' }}>
        {kind === 'msg' &&
          (profileReg ? (
            <div id="msg">작성완료</div>
          ) : (
            <div id="msg">미완성</div>
          ))}
        {kind === 'auth' &&
          (certifiReg ? <div id="msg">{setAuthText(certifiReg)}</div> : '')}
        <Image id="arrow" src={arrow} alt="화살표" width={24} height={24} />
      </div>
    </ContentWapper>
  );
};

export default ContentBox;
