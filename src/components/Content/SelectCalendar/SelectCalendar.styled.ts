import styled from "styled-components";
import 'react-calendar/dist/Calendar.css';

export const SelectCalendarContainer = styled.div`
  width: inherit;
  height: 100%;

  .react-calendar {
    width: inherit;
    height: 18.5rem;
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
        color: #868E96;

        abbr[title] {
          text-decoration: none;
        }

        abbr[title="토요일"] {
          color: #00A0E1;
        }

        abbr[title="일요일"] {
          color: #FF5757;
        }
      }

      .react-calendar__month-view__days {
        .react-calendar__tile--now {
          background-color: #fff;
        }

        .react-calendar__tile--active {
          background-color: #2FC4B2;
          border-radius: 4px;
        }
      }
    }
  }
`

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
`
