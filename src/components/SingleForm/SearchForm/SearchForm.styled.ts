import styled from 'styled-components';

export const TextFieldWrapper = styled.div`
display: flex;
  width: 90%;
  height: 3.25rem;
  position: absolute;
  border-radius: 0.5rem;
  padding: 0.3rem 1rem;
  align-items: center;
background: #F8F9FA;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
`;

export const SearchResultWrapper = styled.div`
  width: 19.8rem;
  height: 17rem;
  overflow-y: scroll;
  position: absolute;
  top: 7.6rem;
  left: 50%;
  transform: translateX(-50%);
`;

export const SearchResult = styled.div`
  width: 19.8rem;
  height: 3.9rem;
  line-height: 3.9rem;
  border-bottom: 1px solid #000;
  cursor: pointer;
`;
