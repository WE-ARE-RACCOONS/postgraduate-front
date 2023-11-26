import styled from "styled-components"

export const TextFieldWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  position: absolute;
  top: 3.75rem;
  left: 50%;
  transform: translateX(-50%);
`

export const SearchResultWrapper = styled.div`
  width: 19.8rem;
  height: 20rem;
  overflow-y: scroll;
  position: absolute;
  top: 7.6rem;
  left: 50%;
  transform: translateX(-50%);
`

export const SearchResult = styled.div`
  width: 19.8rem;
  height: 3.9rem;
  line-height: 3.9rem;
  border-bottom: 1px solid #000;
  cursor: pointer;
`