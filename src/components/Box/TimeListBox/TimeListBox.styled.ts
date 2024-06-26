import styled from 'styled-components';

export const TimeListContainer = styled.div`
  width: 100%;
  height: max-content;
  min-height: 9.5rem;
  border-radius: 8px;
  background-color: #f8f9fa;
  position: relative;
`;

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
    background-color: #2fc4b2;
  }
`;

export const WeekEl = styled.div`
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background-color: #dee2e6;
  text-align: center;
  line-height: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: #fff;
`;

export const TimeListArray = styled.div`
  width: 11.5rem;
  height: fit-content;
  min-height: 4.25rem;
  padding: 4rem 0 1.25rem 1.25rem;
`;

export const TimeEl = styled.div`
  width: 11.5rem;
  height: 1.25rem;
  font-size: 14px;
  display: flex;
  margin-bottom: 0.25rem;
  line-height: 140%;
  letter-spacing: -0.5px;
`;

export const TimeDay = styled.div`
  width: 2.5rem;
  height: 1.25rem;
  font-weight: 700;
`;

export const TimeTerm = styled.div`
  width: 9rem;
  height: 1.25rem;
`;
