import styled from "styled-components";

export const TextareaFormContainer = styled.div`
  width: 100%;
  height: 13.2rem;

  textarea {
    width: 100%;
    height: 11.875rem;
    resize: none;
    padding: 0.5rem 0.75rem;
    border-radius: 4px;
    border: 1px solid #DFDFDF;
    letter-spacing: -0.6px;
    font-family: Pretendard;
  }

  textarea::placeholder {
    font-family: Pretendard;
    line-height: 150%;
    color: #ADB5BD;
  }

  textarea:focus {
    outline: none;
  }

  .alert {
    border: 1px solid #ff5757;
  }
`

export const TextareaFormTop = styled.div`
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;

  #textarea-form-top-title {
    font-weight: 700;
    line-height: 1rem;
    letter-spacing: -0.6px;
  }

  #textarea-form-top-char-count {
    font-size: 12px;
    color: #868E96;
  }
`