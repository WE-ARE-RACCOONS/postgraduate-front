import React from 'react';
import { TitleWrapper } from './TitleBox.styled';

const TitleBox = ({ title }: { title: string }) => {
  return <TitleWrapper>{title}</TitleWrapper>;
};

export default TitleBox;
