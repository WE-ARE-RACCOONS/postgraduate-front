import styled from 'styled-components';
interface TapStyleProps {
  selected: boolean;
}

export const MentoringMapBox = styled.div`
  border: 1px solid blue;
  width: 100%;
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
export const NoMentoring = styled.div`
  color: #c2cede;
  text-align: center;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 1.4rem */
  display: flex;
  justify-content: center;
`;
export const DoneBtnBox = styled.div`
  width: 19.4375rem;
  height: 2.375rem;
  flex-shrink: 0;
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
  cursor: pointer;
`;
export const TabResultContainer = styled.div`
  height: 100vh;
  background-color: #f8f9fa;
`;
export const TabResult = styled.div`
  border-top: 1px solid #c2cede;
  height: 100%;
  padding-bottom: 5rem;
`;
