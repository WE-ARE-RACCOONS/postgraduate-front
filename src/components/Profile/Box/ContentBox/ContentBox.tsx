import React from 'react';
import { ContentWapper } from './ContentBox.styled';
import Image from 'next/image';
import arrow from '@/../../public/arrow-right.png'
const ContentBox = ({
  content,
  onClick,
}: {
  content: string;
  onClick?: () => void;
}) => {
  return (
    <ContentWapper  onClick={onClick}>
      {content}
      <Image
      id="arrow"
      src={arrow}
      alt="화살표"
      width={24}
      height={24}
      />
    </ContentWapper>
  );
};

export default ContentBox;
