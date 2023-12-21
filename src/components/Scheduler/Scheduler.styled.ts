import styled from "styled-components";

export const SchedulerContainer = styled.div`
  width: 20.5rem;
  height: max-content;
  min-height: 18.25rem;
  border: 1px solid #a1a1a1;
  border-radius: 10px;
  position: relative;
  padding: 0.75rem;
`

export const SchedulerEmptyBox = styled.div`
  width: 10.3rem;
  height: 4rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`

export const SchedulerElContainer = styled.div`
  width: 18.875rem;
  height: max-content;
`

export const SchedulerEl = styled.div`
  width: 18.875rem;
  height: 3.375rem;
  border-radius: 5px;
  background-color: #d9d9d9;
  display: flex;
  justify-content: space-between;
  padding: 1rem 0.5rem 1rem 1.4rem;
  margin-bottom: 1rem;

  #scheduler-el-time {
    width: max-content;
    height: 1.375rem;
  }

  #scheduler-el-remove-btn {
    width: 2.625rem;
    height: 2.125rem;
  }
`