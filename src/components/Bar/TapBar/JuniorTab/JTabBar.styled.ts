import styled from 'styled-components';

interface TapStyleProps {
  selected: boolean;
}

export const TabWrap = styled.div`
display: flex;
justify-content: space-between;
margin: 0 1.7rem;
`
export const TabResult = styled.div`
border-top:1px solid #C2CEDE;
height: 100%;

`
export const TabResultContainer = styled.div`
height: 100vh;
background-color: #F8F9FA;
`
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
