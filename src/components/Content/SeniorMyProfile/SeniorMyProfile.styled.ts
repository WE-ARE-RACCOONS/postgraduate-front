import styled from 'styled-components';

export const SMPContainer = styled.div`
  width: inherit;
  height: 100%;
  overflow-y: scroll;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid #000;

  #x-icon {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }

  #profile-line {
    width: 100%;
    position: absolute;
    top: 17.7rem;
  }

  #profile-modify-btn {
    width: 20.5rem;
    height: 2.375rem;
    position: absolute;
    top: 41rem;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const SMPInfoBox = styled.div`
  width: 21.4375rem;
  margin-left: 1rem;
  height: 5.875rem;
  flex-shrink: 0;
  border-radius: 1rem;
  background: #f8f9fa;
  position: absolute;
  top: 3rem;
  display: flex;
  align-items: center;
`;

export const SMPInfoTextBox = styled.div`
  width: max-content;
  height: 3.25rem;
  border: 1px solid #000;
  #postgradu {
    color: #495565;
    font-family: Pretendard;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 1.05rem */
  }

  #mentoring-time-box {
    width: 5.25rem;
    height: 1.5rem;
    padding: 0.25rem 0.75rem;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 500;
    display: flex;
    border-radius: 4px;
    border: 0.5px solid var(--_7, #969fa3);
  }

  #time-text {
    color: #3bf;
  }
`;

export const SMPLabBox = styled.div`
  width: 20.5rem;
  height: max-content;
  border: 1px solid #000;
  position: absolute;
  top: 10rem;
  left: 50%;
  transform: translateX(-50%);

  #lab-name-text {
    font-weight: 700;
  }
`;

export const SMPLabKeywordBox = styled.div`
  width: 20.5rem;
  height: max-content;
  border: 1px solid #000;
  display: flex;
  flex-wrap: wrap;
`;

export const SMPIntroduceBox = styled.div`
  width: 20.5rem;
  height: max-content;
  border: 1px solid #000;
  position: absolute;
  top: 19.5rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 15px;

  #profile-single-intro {
    font-weight: 700;
    margin-bottom: 1.375rem;
  }
`;

export const SMPIntroDesc = styled.div`
  width: 20.5rem;
  height: 1.4rem;
`;
export const EditBtn = styled.div`
  margin-top: 40rem;
`;
