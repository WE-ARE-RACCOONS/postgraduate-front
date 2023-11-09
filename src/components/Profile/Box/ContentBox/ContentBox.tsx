import React from 'react';
import { ContentWapper } from './ContentBox.styled';

const ContentBox = ({ content }: { content: string }) => {
  return <ContentWapper as="button">{content}</ContentWapper>;
};

export default ContentBox;
