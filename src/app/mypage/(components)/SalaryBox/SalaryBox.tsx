import { SalaryBoxProps } from '@/types/box/salaryBox';
import {
  InfoMark,
  SalaryBlock,
  SalaryBoxContainer,
  SalaryDesc,
  SalaryValue,
  TooltipBox,
} from './SalaryBox.styled';
import Image from 'next/image';
import tooltip from '../../../../../public/tooltip.png';
import { useState } from 'react';

function SalaryBox(props: SalaryBoxProps) {
  const [showTip, setShowTip] = useState(false);

  function addCommas(amount: number) {
    if (amount === 0) {
      return '-';
    } else {
      return amount.toLocaleString('ko-KR') + '원';
    }
  }

  function formatDate(dateStr: string) {
    if (props.salaryAmount === 0) {
      return '-';
    } else {
      const splitDate = dateStr.split('-');
      const month = parseInt(splitDate[1]);
      const date = splitDate[2];
      return `${month}월 ${date}일`;
    }
  }

  return (
    <SalaryBoxContainer>
      <div id="left">
        <SalaryBlock>
          <SalaryDesc>정산 예정액</SalaryDesc>
          <SalaryValue>{addCommas(props.salaryAmount)}</SalaryValue>
        </SalaryBlock>
      </div>
      <div id="middle"></div>
      <div id="right">
        <TooltipBox $showTip={showTip}>
          <Image id="tooltip-img" src={tooltip} alt="툴팁 말풍선" />
          <div id="tooltip-text">정산은 매주 목요일에 이루어져요.</div>
        </TooltipBox>
        <SalaryBlock>
          <div
            style={{
              width: '6.5rem',
              height: '1.25rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <SalaryDesc>다음 정산 예정일</SalaryDesc>
            <InfoMark
              onClick={() => {
                setShowTip(!showTip);
              }}
            >
              ?
            </InfoMark>
          </div>
          <SalaryValue>{formatDate(props.salaryDate)}</SalaryValue>
        </SalaryBlock>
      </div>
    </SalaryBoxContainer>
  );
}

export default SalaryBox;
