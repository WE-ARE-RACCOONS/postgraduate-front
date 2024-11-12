import styled from 'styled-components';

export const ProfileCardContainer = styled.div<{ $overWidth: boolean }>`
  width: 100%;
  height: ${(props) => (props.$overWidth ? '10rem' : '8rem')};
  background-color: #fff;
  position: relative;

  #profile-img-wrapper {
    position: absolute;
    top: 30%;
    left: 1rem;
    transform: translateY(-50%);
  }

  #profile-card-one-linear {
    font-size: 13px;
    line-height: 15px;
    color: #6d747e;
    position: absolute;
    bottom: 0%;
    padding-bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 13rem;
    text-align: center;
  }
`;

export const ProfileCardInfo = styled.div<{ $overWidth: boolean }>`
  max-width: 13rem;
  position: absolute;
  top: 30%;
  right: 2rem;
  transform: translateY(-50%);

  #profile-card-professor {
    font-size: 14px;
    margin-top: 3px;
    #professor-name {
      font-weight: 600;
    }
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
  font-size: 15px;
  display: flex;
  gap: 5px;
  font-weight: 700;
  color: #212529;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
