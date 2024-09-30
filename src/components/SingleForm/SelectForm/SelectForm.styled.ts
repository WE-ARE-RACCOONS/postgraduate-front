import styled from 'styled-components';

export const SelectFormContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  height: 70%;
  position: absolute;
  top: 2rem;
  color: #464c51;
  left: 50%;
  transform: translateX(-50%);
  font-size: 13px;

  h3 {
    margin-bottom: 1rem;
    font-size: 15px;
  }

  #select-field-subtitle {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.375rem;

    #field-alert {
      color: #ff5757;
      font-size: 11.93px;
    }
  }

  #select-field-direction {
    width: 100%;
    display: inline-flex;
    flex-wrap: wrap;
    height: auto;
    font-size: 13px;
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
  align-items: center;
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
