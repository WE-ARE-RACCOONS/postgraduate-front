import styled from 'styled-components';

export const MatchingFormContainer = styled.div`
  width: 20.5rem;
  margin-bottom: 1rem;

  #matching-info-form {
    width: 20.5rem;
    display: flex;
height: 5rem;
padding: 0.5rem 0.75rem;
flex-direction: column;
align-items: center;
align-self: stretch;
border-radius: 0.25rem;
border: 1px solid #DFDFDF;
color: #212529;
font-family: Pretendard;
font-size: 1rem;
font-style: normal;
font-weight: 400;
line-height: 1.5rem; /* 150% */
letter-spacing: -0.0375rem;
&::placeholder {
  color: #ADB5BD;
font-family: Pretendard;
font-size: 1rem;
font-style: normal;
font-weight: 400;
line-height: 1.5rem; /* 150% */
letter-spacing: -0.0375rem;
    }
  }
`;

export const MatchingFormHeader = styled.div`
  width: 20.5rem;
  display: flex;
  justify-content: space-between;

  #matching-form-char-count {
    color: #868E96;
font-size: 0.75rem;
font-style: normal;
font-weight: 400;
line-height: 1.125rem; /* 150% */
letter-spacing: -0.0375rem;
  }
`;

export const MatchingFormTitle = styled.div`
  width: max-content;
  height: 1.375rem;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;

  #matching-form-title {
    color: #212529;
font-family: Pretendard;
font-size: 0.875rem;
font-style: normal;
font-weight: 700;
line-height: 1rem; /* 114.286% */
letter-spacing: -0.0375rem;
  }

`;
