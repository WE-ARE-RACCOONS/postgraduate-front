import styled from 'styled-components';

export const SeniorProfileBox = styled.div`
  height: 9.58rem;
  padding: 0.97rem;
  padding-top: 0;
  padding-bottom: 0;
  background-color: #f8f9fa;
  border-radius: 1rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
`;

export const SeniorProfileContent = styled.div`
  width: 93%;
  display: flex;
`;

export const SeniorProfileInfo = styled.div`
  height: 74px;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const SPmajor = styled.div`
  color: #555555;
  display: flex;
  flex-direction: column;
  font-weight: 600;
  font-size: 16px;

  .professor-str {
    margin-top: 3px;
    line-height: 20px;
    font-size: 14px;
  }
  span {
    line-height: 20px;
    font-size: 14px;
    font-weight: 400;
  }
`;

export const SPnickname = styled.div`
  font-weight: 700;
  line-height: 16.8px;
  color: #21b1a0;
  padding: 0.1rem 0;
  font-size: 12px;
  display: flex;
  #nickname-str {
    font-weight: 500;
  }
`;

export const SPField = styled.div`
  color: #212529;
  font-size: 0.75rem;
  margin-top: 0.1rem;
`;

export const Skeyword = styled.div`
  width: 19rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const Keyword = styled.div`
  height: 1.75rem;
  padding: 0.31rem 0.63rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  background: rgba(124, 143, 141, 0.1);
  margin-left: 0.25rem;
  font-size: 0.75rem;
  white-space: nowrap;
`;

export const SPWrapper = styled.div`
  display: flex;
`;
