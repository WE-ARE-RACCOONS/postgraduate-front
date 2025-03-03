import styled from 'styled-components';

export const KeywordFormContainer = styled.div`
  width: 20rem;
  height: 70%;
  position: absolute;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);

  h3 {
    margin-bottom: 1rem;
    font-size: 16px;
    color: #020202;
  }

  #select-keyword-subtitle {
    width: 14.1rem;
    height: 1.1rem;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 7px;

    #select-keyword-subtitle-text {
      width: 3.7rem;
      height: 1.1rem;
      display: flex;
      justify-content: space-between;

      #keyword-star {
        color: #00a0e1;
        font-weight: 700;
      }
    }

    #keyword-alert {
      color: #ff5757;
    }
  }

  #select-keyword-direction {
    width: 18.5rem;
    color: #464c51;
    font-size: 13px;
    flex-wrap: pre;
    line-height: 140%;
    letter-spacing: -0.5px;
    margin-bottom: 7px;
  }

  #keyword-submit-btn {
    width: 100%;
    height: 3.313rem;
    border: none;
    border-radius: 12px;
    background-color: #2fc4b2;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
  }
  .keyword-close-btn {
    width: 100%;
    height: 50px;
    border: none;
    border-radius: 12px;
    background-color: #fff;
    color: #6d747e;
    font-size: 16px;
    margin-top: 15px;
    font-weight: 700;
    cursor: pointer;
  }
  .keyword-submit-btn-non {
    width: 100%;
    height: 3.313rem;
    border: none;
    border-radius: 12px;
    background-color: #adb5bd;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    position: absolute;
    bottom: 3.5rem;
    cursor: pointer;
  }
`;

export const KeywordFormBtnContainer = styled.div`
  width: 100%;
  height: max-content;
`;

export const KeywordFormWrapper = styled.div`
  width: 100%;
  height: 82%;
  overflow-x: hidden;
  overflow-y: scroll;
`;

export const KeywordInputFormBox = styled.div`
  width: 100%;
  font-size: 13px;
  border-radius: 8px;
  border: 1px solid #dcdfe4;
  background: #fff;
  margin-top: 0.625rem;
  padding: 1rem 0.5rem;
  display: flex;
  justify-content: space-between;

  #keyword-input-form {
    width: 80%;
    border: none;
  }

  #keyword-input-form::placeholder {
    font-size: 16px;
    color: #adb5bd;
  }

  #keyword-input-form:focus {
    outline: none;
  }

  #keyword-input-btn {
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
