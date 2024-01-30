import styled from 'styled-components';

export const SelectTimeWrapper = styled.div`
  width: 100%;
  height: max-content;
`;

export const SelectTimeValidator = styled.div`
  color: #f16464;
  font-size: 12px;
  margin: 0.375rem 0 1rem 0;
`;

export const SelectTimeContainer = styled.div<{ $alertFlag: boolean }>`
  width: 100%;
  height: 3.19rem;
  border-radius: 0.5rem;
  border: ${(props) => (props.$alertFlag ? '1px solid #F16464' : 'none')};
  background-color: #f8f9fa;
  cursor: pointer;
  position: relative;

  #down-arrow {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const SelectTimeContent = styled.div`
  width: 90%;
  height: 1.5rem;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .abled {
    color: #000;
  }
`;

export const SelectTimeText = styled.div`
  width: max-content;
  max-width: 17.125rem;
  height: 1.5rem;
  color: #adb5bd;
  display: flex;
`;
