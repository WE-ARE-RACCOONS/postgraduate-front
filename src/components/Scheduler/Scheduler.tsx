import {
  SchedulerContainer,
  SchedulerEl,
  SchedulerElContainer,
  SchedulerEmptyBox,
  SCHAddBtn,
  SchedulerBox,
} from './Scheduler.styled';
import { PROFILE_SUB_DIRECTION } from '@/constants/form/cProfileForm';
import React from 'react';
import useFullModal from '@/hooks/useFullModal';
import { useAtom } from 'jotai';
import { sAbleTime } from '@/stores/senior';

function Scheduler() {
  const [timeData, setTimeData] = useAtom(sAbleTime);

  const { openModal: openSeniorMentoringTimeModal } = useFullModal({
    modalType: 'senior-mentoring-time',
  });
  const clickHandler = (removeIdx: number) => {
    setTimeData(timeData.filter((_, idx) => idx !== removeIdx));
  };
  const formatTime = (time: string) => {
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
              <SCHAddBtn onClick={openSeniorMentoringTimeModal}>
                +추가하기
              </SCHAddBtn>
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
                    {el.day}요일 {formatTime(el.startTime)} ~{' '}
                    {formatTime(el.endTime)}
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
            <SCHAddBtn onClick={openSeniorMentoringTimeModal}>
              +추가하기
            </SCHAddBtn>
          </div>
        )}
      </SchedulerContainer>
    </div>
  );
}

export default Scheduler;
