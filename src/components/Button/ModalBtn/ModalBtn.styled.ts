import styled from 'styled-components';
interface SInfoBtnProps {
  $isGet?: boolean;
}
export const StyledModalBtn = styled.button`
  width: 20.5rem;
  height: 3.875rem;
  background-color: white;
  margin: 0.5rem 0;
  border: 0.5px solid black;
  border-radius: 4px;
  cursor: pointer;
`;
export const StyledSModalBtn = styled.button`
  margin: 0.8rem;
  display: flex;
  margin-left: 4%;
  align-items: center;
  justify-content: center;
  width: 92%;
  height: 2.375rem;
  cursor: pointer;
  border-radius: 0.5rem;
  background: #2fc4b2;
  border: none;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 1.4rem */
`;
export const StyledMSBtn = styled.button`
  margin-bottom: 1rem;
  display: flex;
  margin-left: 4%;
  align-items: center;
  justify-content: center;
  width: 92%;
  height: 2.375rem;
  cursor: pointer;
  border-radius: 0.5rem;
  background: #2fc4b2;
  border: none;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 1.4rem */
`;
export const SInfoBtn = styled.button<SInfoBtnProps>`
  color: ${(props) => (props.$isGet ? '#ADB5BD' : '#212529')};
  margin-top: 0.5rem;
  height: 3.1875rem;
  width: 97%;
  flex-shrink: 0;
  border-radius: 0.5rem;
  border: 1px solid #c2cede;
  background: #f8f9fa;
  padding: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #495565;
  cursor: pointer;
`;
