import React from 'react';
import TitleComponent from '../Box/TitleBox/TitleBox';
import ContentComponent from '../Box/ContentBox/ContentBox';
import {  CustomerCenterBox } from './CustomerCenter.styled';
function CustomerCenter() {
  return (
    <CustomerCenterBox>
      <TitleComponent title="고객센터"></TitleComponent>
      <ContentComponent content="문의하기"></ContentComponent>
    </CustomerCenterBox>
  );
}

export default CustomerCenter;
