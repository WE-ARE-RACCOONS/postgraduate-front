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
export const SeniorProfileImg = styled.img`
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 90px;
  margin-top: 1.1rem;
  margin-bottom: 0.9rem;
  margin-right: 0.66rem;
`;

export const SeniorProfileInfo = styled.div`
  height: 4rem;
  margin-top: 1.5rem;
`;

export const SPmajor = styled.div`
  color: #555555;
  display: flex;
  font-weight: 600;
  font-size: 1rem;
  #professor-str {
    font-weight: 600;
  }
`;

export const SPnickname = styled.div`
  font-weight: 600;
  color: #333537;
  padding: 0.1rem 0;
  font-size: 1.12rem;
  display: flex;
  #nickname-str {
    color: #64686c;
    font-weight: 400;
    font-size: 0.75rem;
    margin-top: 0.3rem;
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
  flex-wrap: wrap;
`;

export const Keyword = styled.div`
  height: 1.75rem;
  padding: 0.31rem 0.63rem;
  border-radius: 0.25rem;
  background-color: rgba(47, 196, 178, 0.1);
  margin-left: 0.25rem;
  font-size: 0.75rem;
  white-space: nowrap;
`;
export const SPWrapper = styled.div`
  display: flex;
`;
