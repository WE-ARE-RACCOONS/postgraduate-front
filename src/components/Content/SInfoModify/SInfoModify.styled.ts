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
    top: 11.25rem;
  }

  #phonenum-form-wrapper {
    position: absolute;
    top: 19.5rem;
  }

  #account-form-wrapper {
    position: absolute;
    top: 26.375rem;
  }

  #bank-and-name-wrapper {
    width: 20.5rem;
    height: 5.75rem;
    position: absolute;
    top: 33.56rem;
    display: flex;
    justify-content: space-between;
  }

  #bank-form-wrapper {
    width: 11.56rem;
    height: 5.75rem;
  }

  #name-form-wrapper {
    width: 8.2rem;
    height: 5.75rem;
  }

  #submit-btn-box {
    position: absolute;
    top: 43.5rem;
  }
`;

export const SInfoImgBox = styled.div`
  width: 4.875rem;
  height: 4.688rem;
  position: absolute;
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
  width: 4.5rem;
  height: 4.5rem;
  position: absolute;
  top: 0;
  opacity: 0;

  #profile-img {
    display: none;
    width: 4.5rem;
    height: 4.5rem;
  }

  #profile-img-label {
    width: 4.5rem;
    height: 4.5rem;
  }
`;

export const InfoFieldTitle = styled.div`
  width: max-content;
  height: 1.375rem;
`;

export const InfoFieldForm = styled.input<{ $width: string }>`
  width: ${(prop) => prop.$width};
  height: 3.875rem;
`;

export const ValidatorBox = styled.div`
  width: 9.5rem;
  height: 1.375rem;
  position: absolute;
  top: 41.2rem;
  left: 50%;
  transform: translateX(-50%);
`;
