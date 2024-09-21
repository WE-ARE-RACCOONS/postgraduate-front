import styled from 'styled-components';

export const SelectFormContainer = styled.div`
  width: 20rem;
  height: 70%;
  position: absolute;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);

  h3 {
    margin-bottom: 1rem;
  }

  #select-field-subtitle {
    width: 14.1rem;
    height: 1.1rem;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.375rem;

    #select-field-subtitle-text {
      width: 3.7rem;
      height: 1.1rem;
      display: flex;
      justify-content: space-between;

      #field-star {
        color: #00a0e1;
        font-weight: 700;
      }
    }

    #field-alert {
      color: #ff5757;
    }
  }

  #select-field-direction {
    width: 12.5rem;
    height: 2.5rem;
    color: #868e96;
    font-size: 14px;
    flex-wrap: pre;
    line-height: 140%;
    letter-spacing: -0.5px;
    margin-bottom: 0.125rem;
  }

  #field-submit-btn {
    width: 100%;
    height: 3.313rem;
    border: none;
    border-radius: 12px;
    background-color: #2fc4b2;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    position: absolute;
    bottom: 0;
    cursor: pointer;
  }
  #field-submit-btn-non {
    width: 100%;
    height: 3.313rem;
    border: none;
    border-radius: 12px;
    background-color: #adb5bd;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    position: absolute;
    bottom: 0;
    cursor: pointer;
  }
`;

export const SelectFormBtnContainer = styled.div`
  width: 100%;
  height: max-content;
`;

export const SelectFormWrapper = styled.div`
  width: 100%;
  height: 82%;
  overflow-x: hidden;
  overflow-y: scroll;
`;

export const FieldInputFormBox = styled.div`
  width: 100%;
  height: 44px;
  border-radius: 8px;
  border: 1px solid #c2cede;
  background: #fff;
  margin-top: 0.625rem;
  padding: 1rem 0.5rem;
  display: flex;
  font-size: 13px;
  justify-content: space-between;

  #field-input-form {
    width: 80%;
    border: none;
  }

  #field-input-form::placeholder {
    font-family: Pretendard;
    font-size: 13px;
    color: #adb5bd;

    height: 44px;
  }

  #field-input-form:focus {
    outline: none;
  }

  #field-input-btn {
    width: 3.5rem;
    border: none;
    background-color: transparent;
    color: #2fc4b2;
    font-size: 16px;
    font-weight: 700;
    font-family: Pretendard;
    cursor: pointer;
  }
`;
