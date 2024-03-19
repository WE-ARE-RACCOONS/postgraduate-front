import {
  AddTimeAbleBottom,
  AddTimeAbleBox,
  AddTimeContainer,
  AddTimeDropdown,
  AddTimeDropdownBox,
  AddTimeDropdownSet,
  AddTimeWeekBox,
  ValidatorBox,
} from './AddTime.styled';
import Image from 'next/image';
import x_icon from '../../../../public/x.png';
import { WEEK_ARRAY } from '@/constants/form/cProfileForm';
import React, { useEffect, useState } from 'react';
import SingleValidator from '@/components/Validator/SingleValidator';
import { useAtom } from 'jotai';
import { sAbleTime } from '@/stores/senior';
import { TimeObj } from '@/types/scheduler/scheduler';
import ClickedBtn from '@/components/Button/ClickedBtn';
import NextBtn from '@/components/Button/NextBtn';

function AddTime({ modalHandler }: { modalHandler: () => void }) {
  const hourOptions = Array.from({ length: 16 }, (_, index) => index + 9);
  const minOptions = ['00', '30'];
  const [inputWeek, setInputWeek] = useState('');
  const [startHour, setStartHour] = useState('9');
  const [startMin, setStartMin] = useState('00');
  const [endHour, setEndHour] = useState('9');
  const [endMin, setEndMin] = useState('00');
  const [flag, setFlag] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [active, setActive] = useState(false);
  const [ableTime, setAbleTime] = useAtom(sAbleTime);

  const clickWeekHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const weekBtns = document.querySelectorAll('.add-time-week-btn');
    weekBtns.forEach((el) => {
      el.className = 'add-time-week-btn';
    });
    e.currentTarget.classList.add('active');
    setInputWeek(e.currentTarget.innerText);
  };
  useEffect(() => {
    if (inputWeek && startHour && endHour) {
      setActive(true);
    }
  }, [inputWeek, startHour, endHour]);

  const submitHandler = () => {
    /** 요일 선택하지 않은 경우 */
    if (!inputWeek) {
      setAlertMsg('요일을 선택해주세요');
      setFlag(true);
      return;
    }

    /** 유효한 시간이 아닐 경우 */
    if (!validateTimeRange()) {
      setAlertMsg('가능 시간을 정확히 입력해주세요');
      setFlag(true);
      return;
    }

    /** 이미 등록된 시간일 경우 */
    const timeObj: TimeObj = {
      day: `${inputWeek}`,
      startTime: `${formatDigit(startHour)}:${startMin}`,
      endTime: `${formatDigit(endHour)}:${endMin}`,
    };

    for (let i = 0; i < ableTime.length; i++) {
      if (
        ableTime[i].day == timeObj.day &&
        ableTime[i].startTime == timeObj.startTime &&
        ableTime[i].endTime == timeObj.endTime
      ) {
        setAlertMsg('이미 등록되어 있는 시간입니다.');
        setFlag(true);
        return;
      }
    }

    setFlag(false);
    setAbleTime([...ableTime, timeObj]);
    modalHandler();
  };

  const validateTimeRange = () => {
    const endTimeNum = Number(endHour + endMin);
    const startTimeNum = Number(startHour + startMin);
    return endTimeNum - startTimeNum > 0;
  };

  const formatDigit = (hour: string) => {
    if (Number(hour) < 10) return `0${hour}`;
    if (Number(hour) >= 10) return `${hour}`;
  };
  return (
    <AddTimeContainer>
      <div style={{ display: 'flex' }}>
        <h3 style={{ marginLeft: '35%', marginTop: '1rem' }}>
          요일 및 시간설정
        </h3>
        <Image
          id="x-icon"
          src={x_icon}
          alt="계정 수정 모달 닫기 버튼"
          onClick={modalHandler}
        />
      </div>
      <AddTimeWeekBox>
        <h3>요일 선택</h3>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '0.75rem',
          }}
        >
          {WEEK_ARRAY.map((el, idx) => (
            <button
              className="add-time-week-btn"
              key={idx}
              onClick={(e) => {
                clickWeekHandler(e);
              }}
            >
              {el}
            </button>
          ))}
        </div>
      </AddTimeWeekBox>
      <AddTimeAbleBox>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h3>시간 선택</h3>
          <div id="setTile-warn">
            요일, 시작시간, 끝시간을 모두 선택해주세요
          </div>
        </div>
        <AddTimeAbleBottom>
          <AddTimeDropdownBox>
            <div id="ATD-title">시작 시간</div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <AddTimeDropdownSet>
                <AddTimeDropdown
                  onChange={(e) => setStartHour(e.currentTarget.value)}
                >
                  {hourOptions.map((value, idx) => (
                    <option key={idx} value={value}>
                      {value}
                    </option>
                  ))}
                </AddTimeDropdown>
                <div id="ATD-middle">시</div>
                <AddTimeDropdown
                  onChange={(e) => setStartMin(e.currentTarget.value)}
                >
                  {minOptions.map((value, idx) => (
                    <option key={idx} value={value}>
                      {value}
                    </option>
                  ))}
                </AddTimeDropdown>
                <div id="ATD-middle">분</div>
              </AddTimeDropdownSet>
              <div id="ATD-bold">부터</div>
            </div>
          </AddTimeDropdownBox>
          <AddTimeDropdownBox>
            <div id="ATD-title">종료 시간</div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <AddTimeDropdownSet>
                <AddTimeDropdown
                  onChange={(e) => setEndHour(e.currentTarget.value)}
                >
                  {hourOptions.map((value, idx) => (
                    <option key={idx} value={value}>
                      {value}
                    </option>
                  ))}
                </AddTimeDropdown>
                <div id="ATD-middle">시</div>
                <AddTimeDropdown
                  onChange={(e) => setEndMin(e.currentTarget.value)}
                >
                  {minOptions.map((value, idx) => (
                    <option key={idx} value={value}>
                      {value}
                    </option>
                  ))}
                </AddTimeDropdown>
                <div id="ATD-middle">분</div>
              </AddTimeDropdownSet>
              <div id="ATD-bold">까지</div>
            </div>
          </AddTimeDropdownBox>
        </AddTimeAbleBottom>
      </AddTimeAbleBox>
      {flag && (
        <ValidatorBox>
          <SingleValidator msg={alertMsg} textColor="#FF3347" />
        </ValidatorBox>
      )}
      <div style={{ marginTop: '31rem' }}>
        {active ? (
          <NextBtn kind="route" onClick={submitHandler} btnText="등록하기" />
        ) : (
          <NextBtn
            kind="route-non"
            onClick={submitHandler}
            btnText="등록하기"
          />
        )}
      </div>
    </AddTimeContainer>
  );
}

export default AddTime;
