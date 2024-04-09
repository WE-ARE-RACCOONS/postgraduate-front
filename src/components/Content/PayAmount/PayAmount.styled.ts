import styled from 'styled-components';

export const PayAmountContainer = styled.div`
  width: 21rem;
  height: 16rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  #pay-amount-title {
    width: inherit;
    height: 2.375rem;
    line-height: 2.375rem;
    text-align: center;
    font-weight: 600;
  }

  #pay-amount-img {
    width: 7.875rem;
    height: 5.75rem;
    position: absolute;
    top: 2.5rem;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const PayAmountDescBox = styled.div`
  width: max-content;
  height: 2.5rem;
  text-align: center;
  line-height: 150%;
  letter-spacing: -0.6px;
  font-size: 14px;
  position: absolute;
  top: 8.8rem;
  left: 50%;
  transform: translateX(-50%);

  .pay-amount-bottom-desc {
    display: flex;
  }

  #pay-amount-bold {
    font-weight: 600;
    color: #ff3347;
  }
`;

export const PayAmountBtnBox = styled.div`
  width: 21rem;
  height: 3.375rem;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;

  .pay-amount-btn {
    width: 10rem;
    height: inherit;
    border-radius: 0.75rem;
    border: 0;
    color: #fff;
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
  }

  #pay-amount-prev-btn {
    background-color: #969fa3;
  }

  #pay-amount-next-btn {
    background-color: #2fc4b2;
  }
`;
