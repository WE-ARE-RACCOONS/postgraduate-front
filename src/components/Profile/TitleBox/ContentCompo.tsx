import React from 'react';
import { ContentBox } from './TitleBox.styled';

const ContentComponent = ({ content }: { content: string }) => {
  return <ContentBox>{content}</ContentBox>;
};

export default ContentComponent;
