import styled from "styled-components";

export const SelectTimeContainer = styled.div`
  width: 100%;
  height: 3.19rem;
  border-radius: 0.5rem;
  background-color: #F8F9FA;
  cursor: pointer;
  position: relative;

  #down-arrow {
    width: 1.5rem;
    height: 1.5rem;
  }
`

export const SelectTimeContent = styled.div`
  width: 90%;
  height: 1.5rem;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const SelectTimeText = styled.div`
  width: max-content;
  max-width: 17.125rem;
  height: 1.5rem;
  color: #ADB5BD;
`