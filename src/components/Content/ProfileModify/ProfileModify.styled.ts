import styled from "styled-components";

export const PMContainer = styled.div`
  width: inherit;
  height: 100%;
  position: relative;
  overflow-y: scroll;

  #x-icon {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
`

export const FieldContainer = styled.div`
  width: 20.5rem;
  height: max-content;
  position: absolute;
  top: 3.625rem;
  left: 50%;
  transform: translateX(-50%);
`

export const FieldBox = styled.div`
  width: 20.5rem;
  height: 5.75rem;
  margin-bottom: 1.125rem;
`

export const FieldTitle = styled.div`
  width: max-content;
  max-width: 20.5rem;
  height: 1.375rem;
  font-weight: 700;
`

export const FieldForm = styled.input`
  width: 20.5rem;
  height: 3.875rem;
  padding: 1.25rem 1rem;
  background-color: #fff;
  border: 1px solid #000;
  cursor: pointer;
`

export const ValidatorBox = styled.div`
  width: 9.5rem;
  height: 1.375rem;
  position: absolute;
  top: 46.375rem;
  left: 50%;
  transform: translateX(-50%);
`

export const SaveBtnBox = styled.div`
  width: 20.5rem;
  height: 3.875rem;
  position: absolute;
  top: 48.69rem;
  left: 50%;
  transform: translateX(-50%);
`