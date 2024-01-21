import styled from 'styled-components';

export const AddTimeContainer = styled.div`
  width: inherit;
  height: 100%;
  position: relative;

  #x-icon {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }

  #add-time-submit-btn {
    width: 10rem;
    height: 3.875rem;
    position: absolute;
    top: 39rem;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const AddTimeWeekBox = styled.div`
  width: 95%;
  height: 7.5rem;
  position: absolute;
  top: 5.375rem;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;

  .add-time-week-btn {
    width: 2.6875rem;
height: 2.6875rem;
flex-shrink: 0;
    margin-right: 0.25rem;
    border-radius: 0.25rem;
background: #DEE2E6;
border: none;
  }

  .active {
    background-color: #2FC4B2;
    color: #fff;
  }
`;

export const AddTimeAbleBox = styled.div`
  width: 95%;
  height: 7.25rem;
  position: absolute;
margin-top: 11.94rem;
  left: 50%;
  transform: translateX(-50%);
  #setTile-warn{
    color: #FF5757;
font-family: Pretendard;
font-size: 0.75rem;
font-style: normal;
font-weight: 500;
line-height: 140%; /* 1.05rem */
letter-spacing: -0.03125rem;
margin-left: 0.5rem;
  }
`;

export const AddTimeAbleBottom = styled.div`
  margin-top: 1rem;
`;

export const AddTimeDropdownBox = styled.div`
margin-bottom: 1.75rem;
  #ATD-title{
    color: #212529;
font-family: Pretendard;
font-size: 0.875rem;
font-style: normal;
font-weight: 500;
line-height: 140%; /* 1.225rem */
letter-spacing: -0.03125rem;
  }
  #ATD-bold{
    color: #212529;
text-align: right;
font-family: Pretendard;
font-size: 0.875rem;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 1.225rem */
letter-spacing: -0.03125rem;
  }
`;

export const AddTimeDropdownSet = styled.div`
display: flex;
align-items: center;
  width: 83%;
  margin-top: 0.5rem;
  #ATD-middle{
    color: #212529;
font-family: Pretendard;
font-size: 0.875rem;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 1.225rem */
letter-spacing: -0.03125rem;
margin-left: 0.5rem;
margin-right: 0.94rem;
  }
`;

export const AddTimeDropdown = styled.select`
  width: 6.625rem;
  height: 2.5rem;
  display: inline-flex;
padding: 0.625rem 0.5rem 0.625rem 1.8125rem;
justify-content: flex-end;
align-items: flex-end;
gap: 1.8125rem;
border-radius: 0.5rem;
background: #F8F9FA;
border: none;
`;

export const ValidatorBox = styled.div`
  width: max-content;
  height: 0.8rem;
  position: absolute;
  top: 32rem;
  left: 50%;
  transform: translateX(-50%);
`;
