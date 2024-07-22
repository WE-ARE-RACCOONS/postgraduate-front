import styled from 'styled-components';

export const SeniorProfileBox = styled.div`
  height: max-content;
  padding: 1rem;
  padding-top: 0;
  background-color: #f8f9fa;
  border-radius: 1rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
`;

export const SeniorProfileContent = styled.div`
  width: 85%;
  height: 7.1rem;
  display: flex;
`;
export const SeniorProfileImg = styled.img`
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 90px;
  margin: 1rem;
`;

export const SeniorProfileInfo = styled.div`
  height: 4rem;
  margin-top: 1.5rem;
`;

export const SPmajor = styled.div`
margin-top: 0.25rem;
  color: #212529;
  display: flex;
font-weight: 600;
font-size: 0.9rem;
  #professor-str {
    font-weight: 600;
  }
`;

export const SPnickname = styled.div`
  font-weight: 600;
  color: #868e96;
  padding: 0.1rem 0;
  font-size: 0.8rem;
`;

export const SPField = styled.div`
   color: #868e96;
  font-size: 0.75rem;
  margin-top: 0.3rem;
`;

export const Skeyword = styled.div`
  width: 19rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 0;
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
