import React from 'react';
import { ContentWapper } from './ContentBox.styled';

const ContentBox = ({
  content,
  onClick,
}: {
  content: string;
  onClick?: () => void;
}) => {
  return (
    <ContentWapper as="button" onClick={onClick}>
      {content}
    </ContentWapper>
  );
};

export default ContentBox;
