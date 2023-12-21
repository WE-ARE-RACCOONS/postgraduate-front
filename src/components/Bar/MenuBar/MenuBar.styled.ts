import styled from 'styled-components';

export const MenuContainer = styled.div`
border-radius: 0.75rem 0.75rem 0rem 0rem; 
  width: inherit;
  height: 3.75rem;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  background-color: white;
  box-shadow: 0px -4px 12px 0px rgba(75, 75, 75, 0.10);

`;

export const MenuBox = styled.div`
  padding: 0.625rem 0;
  width: 6.8rem;
  height: inherit;
  cursor: pointer;
  text-align: center;
`;
export const MenuWord = styled.div`
font-size: 0.75rem;
font-weight: 400;
color: #CBCFDB;
`