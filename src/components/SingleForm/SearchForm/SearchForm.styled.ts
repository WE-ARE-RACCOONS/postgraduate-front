import styled from 'styled-components';

export const TextFieldWrapper = styled.div`
  display: flex;
  width: 90%;
  height: 3.25rem;
  position: absolute;
  border-radius: 0.5rem;
  padding: 0.3rem 1rem;
  align-items: center;
  background: #f8f9fa;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
`;

export const SearchResultWrapper = styled.div`
  width: 19.8rem;
  height: 60%;
  overflow-y: scroll;
  position: absolute;
  top: 4.6rem;
  left: 50%;
  transform: translateX(-50%);

  #spinner-container {
    width: 3rem;
    height: 3rem;
    margin: 3rem auto;
  }
`;

export const SearchResult = styled.div`
  width: 16rem;
  height: 3.9rem;
  line-height: 3.9rem;
  display: flex;
  align-items: center;
  margin-left: 3.15rem;
  cursor: pointer;
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.03125rem;
`;
