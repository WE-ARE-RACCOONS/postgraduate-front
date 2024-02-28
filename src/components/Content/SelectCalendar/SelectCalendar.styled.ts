import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';

export const SelectCalendarContainer = styled.div`
  width: inherit;
  height: 100%;

  .react-calendar {
    width: inherit;
    border: none;
    font-family: Pretendard;
  }

  .react-calendar__navigation {
    width: inherit;
    height: 3.5rem;
    display: flex;
    text-align: center;
    align-items: center;
    padding: 0 5.5rem;

    .react-calendar__navigation__label {
      width: 5.5rem;
      height: 1.375rem;
      font-size: 16px;
      border: none;
      font-weight: 700;
      background-color: #fff;
    }

    .react-calendar__navigation__prev-button {
      border: none;
      background-color: #fff;
      cursor: pointer;
      opacity: 0;
    }

    .react-calendar__navigation__next-button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }
  }

  .react-calendar__viewContainer {
    .react-calendar__month-view {
      .react-calendar__month-view__weekdays {
        font-size: 14px;
        font-weight: 400;
        color: #868e96;

        abbr[title] {
          text-decoration: none;
        }

        abbr[title='토요일'] {
          color: #ff5757;
        }

        abbr[title='일요일'] {
          color: #ff5757;
        }
      }

      .react-calendar__month-view__days {
        .react-calendar__tile--now {
          background-color: #fff;
        }

        .react-calendar__tile--active {
          background-color: #2fc4b2;
          border-radius: 4px;
        }
      }
    }
  }
`;

export const SelectCalendarHeader = styled.div`
  width: inherit;
  height: 3.5rem;
  position: relative;

  #back-arrow-img {
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    top: 50%;
    left: 0.75rem;
    transform: translateY(-50%);
    cursor: pointer;
  }

  #header-text {
    width: max-content;
    height: 1.6rem;
    font-size: 20px;
    font-weight: 700;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const SelectCalendarTimeContainer = styled.div`
  width: 95%;
  margin: 0 auto;
  margin-top: 3.75rem;

  #select-calendar-time-text {
    width: max-content;
    height: 1.375rem;
    font-weight: 700;
    line-height: 140%;
    letter-spacing: -0.5px;
  }
`;

export const SelectCalendarTimeList = styled.div`
  width: 100%;
  height: max-content;
  margin-top: 0.625rem;

  .able-time {
    width: 100%;
    height: 3.2rem;
    border-radius: 8px;
    background-color: #f8f9fa;
    margin-bottom: 0.5rem;
    padding-left: 1rem;
    line-height: 3.2rem;
    letter-spacing: -0.5px;
    cursor: pointer;
  }

  .selected-time {
    color: #fff;
    font-weight: 700;
    background-color: #2fc4b2;
  }
`;

export const SelectCalendarBtnContainer = styled.div`
  width: 95%;
  height: 3.375rem;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 7.69rem;
  margin-bottom: 1.375rem;

  #select-calendar-prev-btn {
    width: 33%;
    height: inherit;
    font-size: 18px;
    font-weight: 700;
    border-radius: 12px;
    background-color: #adb5bd;
    border: none;
    color: #fff;
    cursor: pointer;
  }

  #select-calendar-next-btn {
    width: 61%;
    height: inherit;
    font-size: 18px;
    font-weight: 700;
    border-radius: 12px;
    background-color: #2fc4b2;
    border: none;
    color: #fff;
    cursor: pointer;
  }
`;
