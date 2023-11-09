import React from 'react';
import{
    TitleBox
}from './TitleBox.styled';

const TitleComponent = ({ title }:{title:string}) => {
  return <TitleBox>{title}</TitleBox>
}

export default TitleComponent;
