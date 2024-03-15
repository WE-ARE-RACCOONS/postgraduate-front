import styled from 'styled-components';
import ModalBtn from '@/components/Button/ModalBtn';
interface TapStyleProps {
  selected: boolean;
}

export const TabResult = styled.div`
  border-top: 1px solid #c2cede;
  height: 100%;
  padding-bottom: 5.5rem;
`;
export const TabResultContainer = styled.div`
  height: 100vh;
  background-color: #f8f9fa;
`;
export const MentoringBox = styled.div`
  width: 95%;
  border: 1px solid #dee2e6;
  border-radius: 1rem;
  background: #fff;
  box-shadow: 0px 0px 8px 0px rgba(73, 85, 101, 0.2);
  margin: 2.3%;
`;
export const TabWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 1.7rem;
`;
export const DateDoneBtn = styled.button`
  width: 19.4375rem;
  height: 2.375rem;
  margin-left: 4%;
  flex-shrink: 0;
  border-radius: 0.5rem;
  background: #00a0e1;
  cursor: pointer;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 1.4rem */
`;
export const TapStyle = styled.div<TapStyleProps>`
  width: 4.9rem;
  height: 3.37rem;
  align-items: center;
  justify-content: center;
  display: flex;
  color: #495565;
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 140%;
  border-bottom: ${({ selected }) => (selected ? '2px solid #495565' : 'none')};
  color: ${({ selected }) => (selected ? '#495565' : '#C2CEDE')};
`;

export const MentoringMapBox = styled.div`
  border: 1px solid blue;
  width: 100%;
`;

export const MentoringShowBtn = styled.button``;
