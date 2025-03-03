'use client';
import ProgressBar from '@/components/Bar/ProgressBar';
import GoogleAnalytics from '@/components/GA/GA';
import BackHeader from '@/components/Header/BackHeader';
import ShortRiseUpModal from '@/components/Modal/ShortRiseUpModal';
import TextareaForm from '@/components/SingleForm/TextareaForm';
import {
  MENTORING_NOTICE,
  MENTORING_QUESTION,
} from '@/constants/form/cMentoringApply';
import { questionAtom, subjectAtom } from '@/stores/mentoring';
import { useAtomValue } from 'jotai';
import { overlay } from 'overlay-kit';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

function MentoringApplyQuestionPage() {
  const [active, setActive] = useState(false);
  const subject = useAtomValue(subjectAtom);
  const question = useAtomValue(questionAtom);

  if (typeof window !== 'undefined') {
    window.localStorage.setItem('topic', subject);
    window.localStorage.setItem('question', question);
  }

  useEffect(() => {
    if (subject.length > 9 && question.length > 9) setActive(true);
    else setActive(false);
  }, [subject, question]);

  const clickHandler = () => {
    if (subject.length > 9 && question.length > 9) {
      overlay.open(({ unmount }) => {
        return (
          <ShortRiseUpModal modalType="payAmount" modalHandler={unmount} />
        );
      });
    }
  };

  return (
    <>
      {/* <GoogleAnalytics /> */}
      <MAQContainer>
        <BackHeader headerText="신청서 작성" />
        <ProgressBar totalNum={3} activeNum={0} />
        <MQANoticeBox>
          <div id="mentoring-notice-text-box">
            <div id="mentoring-notice-text" className="mentoring-notice">
              {MENTORING_NOTICE.noticeText}
            </div>
            <div id="mentoring-send-text" className="mentoring-notice">
              {MENTORING_NOTICE.sendText}
            </div>
            <div id="mentoring-alert-text" className="mentoring-notice">
              {MENTORING_NOTICE.alertText}
            </div>
          </div>
        </MQANoticeBox>
        <div id="mentoring-subject-form-wrapper">
          <TextareaForm
            title={MENTORING_QUESTION.subjectTitle}
            placeholder={MENTORING_QUESTION.subjectPlaceholder}
            minCount={10}
            maxCount={500}
            targetAtom={subjectAtom}
            alertMsg={MENTORING_QUESTION.subjectAlert}
          />
        </div>
        <div id="mentoring-question-form-wrapper">
          <TextareaForm
            title={MENTORING_QUESTION.questionTitle}
            placeholder={MENTORING_QUESTION.questionPlaceholder}
            minCount={10}
            maxCount={500}
            targetAtom={questionAtom}
            alertMsg={MENTORING_QUESTION.questionAlert}
          />
        </div>
        <MAQNextBtn onClick={clickHandler} className={active ? 'active' : ''}>
          다음으로
        </MAQNextBtn>
      </MAQContainer>
    </>
  );
}

const MAQContainer = styled.div`
  width: inherit;
  height: 100%;
  position: relative;

  #mentoring-subject-form-wrapper {
    width: 95%;
    height: 13.2rem;
    position: absolute;
    top: 13.3rem;
    left: 50%;
    transform: translateX(-50%);
  }

  #mentoring-question-form-wrapper {
    width: 95%;
    height: 13.2rem;
    position: absolute;
    top: 28.5rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .active {
    background-color: #2fc4b2;
    cursor: pointer;
  }
`;

const MQANoticeBox = styled.div`
  width: 95%;
  height: 5.75rem;
  border-radius: 8px;
  background-color: #f8f9fa;
  position: absolute;
  top: 4.75rem;
  left: 50%;
  transform: translateX(-50%);

  #mentoring-notice-text-box {
    width: max-content;
    height: 4rem;
    position: absolute;
    top: 1rem;
    left: 1rem;
  }

  .mentoring-notice {
    font-size: 14px;
    line-height: 140%;
    letter-spacing: -0.5px;
  }

  #mentoring-notice-text {
    font-weight: 700;
    margin-bottom: 0.25rem;
  }

  #mentoring-alert-text {
    color: #2fc4b2;
  }
`;

const MAQNextBtn = styled.button`
  width: 95%;
  height: 3.375rem;
  background-color: #dee2e6;
  color: #fff;
  position: absolute;
  top: 44.25rem;
  left: 50%;
  transform: translateX(-50%);
  border: none;
  border-radius: 12px;
  margin-bottom: 3.5rem;
  font-weight: 700;
  font-family: Pretendard;
`;

export default MentoringApplyQuestionPage;
