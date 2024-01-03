import styled from "styled-components";

export const TimeListContainer = styled.div`
  width: 100%;
  height: 11rem;
  border-radius: 8px;
  background-color: #F8F9FA;
  position: relative;
`

export const WeekListContainer = styled.div`
  width: 85%;
  height: 1.75rem;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 1.25rem;
  left: 50%;
  transform: translateX(-50%);

  .active {
    background-color: #2FC4B2;
  }
`

export const WeekEl = styled.div`
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background-color: #DEE2E6;
  text-align: center;
  line-height: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: #fff;
`