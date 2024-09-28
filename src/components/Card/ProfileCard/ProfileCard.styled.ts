import styled from 'styled-components';

export const ProfileCardContainer = styled.div<{ $overWidth: boolean }>`
  width: 100%;
  height: ${(props) => (props.$overWidth ? '8.25rem' : '7.25rem')};
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0px 0px 8px 0px rgba(73, 85, 101, 0.2);
  position: relative;

  #profile-img-wrapper {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
  }
`;

export const ProfileCardInfo = styled.div<{ $overWidth: boolean }>`
  max-width: 13rem;
  position: absolute;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);

  #profile-card-professor {
    font-size: 14px;
    margin-top: ${(props) => (props.$overWidth ? '0.875rem' : '')};
  }
`;

export const ProfileCardInfoTop = styled.div`
  width: 13rem;
  height: 1.57rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  #profile-card-mentoring-time {
    width: max-content;
    height: 1.125rem;
    align-items: center;
    font-size: 12px;
    display: flex;
    line-height: 1.125rem;
  }

  #mentoring-time-desc {
    color: #6d747e;
    font-weight: 500;
  }

  #mentoring-time-term {
    color: #212529;
    font-weight: 600;
  }
`;

export const ProfileCardInfoMid = styled.div`
  width: 13rem;
  height: 1.25rem;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  color: #868e96;
`;
