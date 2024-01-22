import { SchedulerProps, TimeObj } from '@/types/scheduler/scheduler';
import {
  SchedulerContainer,
  SchedulerEl,
  SchedulerElContainer,
  SchedulerEmptyBox,
  SCHAddBtn,
  SchedulerBox,
} from './Scheduler.styled';
import { PROFILE_SUB_DIRECTION } from '@/constants/form/cProfileForm';
import React, { useEffect, useState } from 'react';
import useModal from '@/hooks/useModal';
import { createPortal } from 'react-dom';
import FullModal from '../Modal/FullModal';
import { useAtom } from 'jotai';
import { sAbleTime } from '@/stores/senior';

function Scheduler() {
  const [timeData, setTimeData] = useAtom(sAbleTime);
  const { modal, modalHandler, portalElement } = useModal(
    'senior-mentoring-time-portal',
  );
  const clickHandler = (removeIdx: number) => {
    setTimeData(timeData.filter((_, idx) => idx !== removeIdx));
  };
  const formatTime = (time:string) => {
    const [hours, minutes] = time.split(':');
    return `${hours}시 ${minutes}분`;
  };

  return (
    <div>
      <SchedulerContainer>
        {timeData.length <= 0 ? (
          <SchedulerBox>
            <SchedulerEmptyBox>
              <div id="add-time-empty" style={{ marginBottom: '1.25rem' }}>
                {PROFILE_SUB_DIRECTION.addTimeEmpty}
              </div>
              <SCHAddBtn onClick={modalHandler}>+추가하기</SCHAddBtn>
            </SchedulerEmptyBox>
          </SchedulerBox>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <SchedulerElContainer>
              {timeData.map((el, idx) => (
                <SchedulerEl key={idx}>
                  <div id="scheduler-el-time">
                  {el.day}요일 {formatTime(el.startTime)} ~ {formatTime(el.endTime)}
                  </div>
                  <div
                    id="scheduler-el-remove-btn"
                    onClick={() => clickHandler(idx)}
                  >
                    삭제
                  </div>
                </SchedulerEl>
              ))}
            </SchedulerElContainer>
            <SCHAddBtn onClick={modalHandler}>+추가하기</SCHAddBtn>
          </div>
        )}
        {modal && portalElement
          ? createPortal(
              <FullModal
                modalType="senior-mentoring-time"
                modalHandler={modalHandler}
              />,
              portalElement,
            )
          : ''}
      </SchedulerContainer>
    </div>
  );
}

export default Scheduler;
