import styled from 'styled-components';

export const SchedulerContainer = styled.div``;
export const SchedulerBox = styled.div`
  display: flex;
  width: 91%;
  height: 12.8125rem;
  padding: 0.5rem;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  border-radius: 0.25rem;
  background: #f8f9fa;
  margin-left: 1rem;
`;
export const SCHAddBtn = styled.button`
  border: none;
  display: inline-flex;
  padding: 0.3125rem 0.625rem;
  align-items: center;
  gap: 0.25rem;
  border-radius: 0.25rem;
  background: #495565;
  color: #fff;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.125rem; /* 150% */
  letter-spacing: -0.0375rem;
`;

export const SchedulerEmptyBox = styled.div`
  width: 10.3rem;
  height: 4rem;
  position: absolute;
  margin-top: 5.31rem;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  #add-time-empty {
    color: #868e96;
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 1.225rem */
    letter-spacing: -0.03125rem;
  }
`;

export const SchedulerElContainer = styled.div`
  width: 18.875rem;
  height: max-content;
  margin-bottom: 1.75rem;
`;

export const SchedulerEl = styled.div`
  margin-bottom: 0.25rem;
  display: flex;
  justify-content: space-between;
  width: 19.4375rem;
  height: 2.5rem;
  padding: 0.5rem 0.75rem;
  align-items: center;
  border-radius: 0.25rem;
  background: #f8f9fa;

  #scheduler-el-time {
    display: flex;
    text-align: left;
    width: max-content;
    color: #3d4044;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; /* 150% */
    letter-spacing: -0.0375rem;
  }

  #scheduler-el-remove-btn {
    color: #ff5757;
    font-family: Pretendard;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 700;
    line-height: 140%; /* 1.05rem */
    letter-spacing: -0.03125rem;
  }
`;
