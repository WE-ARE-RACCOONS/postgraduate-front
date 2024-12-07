import styled from 'styled-components';

export const SInfoContainer = styled.div`
  width: inherit;
  height: 100%;
  position: relative;
  overflow-y: scroll;

  #x-icon {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }

  #nickname-form-wrapper {
    position: absolute;
    width: 98%;
    top: 11.25rem;
  }

  #phonenum-form-wrapper {
    position: absolute;
    width: 98%;
    top: 18.3rem;
  }

  #account-form-wrapper {
    position: absolute;
    top: 26.375rem;
    width: 98%;
    margin-left: 0.75rem;
  }

  #bank-and-name-wrapper {
    height: 5.75rem;
    width: 93%;
    position: absolute;
    top: 32.56rem;
    display: flex;
    justify-content: space-between;
    margin-left: 0.75rem;
  }

  #bank-form-wrapper {
    width: 55%;
    height: 5.75rem;
  }

  #name-form-wrapper {
    width: 40%;
    height: 5.75rem;
  }

  #submit-btn-box {
    position: absolute;
    top: 38.5rem;
    width: 99%;
  }
`;

export const SInfoImgBox = styled.div`
  position: absolute;
  width: 7.3rem;
  height: 7.4rem;
  top: 4.75rem;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;

  #camera-icon {
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;

export const SInfoImgInputBox = styled.div`
  width: 7.5rem;
  height: 7.5rem;
  position: absolute;
  top: 0;
  opacity: 0;

  #profile-img {
    display: none;
    width: 7.5rem;
    height: 7.5rem;
  }

  #profile-img-label {
    width: 7.5rem;
    height: 7.5rem;
  }
`;

export const InfoFieldTitle = styled.div`
  width: max-content;
  color: #212529;
  font-family: 'Noto Sans JP';
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 0.5rem;
`;

export const InfoFieldForm = styled.input<{ $width: string }>`
  width: ${(prop) => prop.$width};
  height: 3.1875rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  border: 1px solid #c2cede;
  background: #fff;
  padding: 0.88rem 1rem;
`;

export const ValidatorBox = styled.div`
  width: 9.5rem;
  height: 1.375rem;
  position: absolute;
  top: 41.2rem;
  left: 50%;
  transform: translateX(-50%);
`;
