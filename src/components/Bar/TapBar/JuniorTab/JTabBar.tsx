'use client';
import React, { useState, useEffect, memo, useRef } from 'react';

import {
  TapStyle,
  TabWrap,
  TabResult,
  TabResultContainer,
  MentoringBox,
  DateDoneBtn,
} from './JTabBar.styled';
import { useAtom, useAtomValue } from 'jotai';
import { activeTabAtom } from '@/stores/tap';
import { tapType } from '@/types/tap/tap';

import { TAB } from '@/constants/tab/ctap';
import MentoringApply from '@/components/domain/mentoring/MentoringApply/MentoringApply';

import ModalBtn from '@/components/comon/Button/ModalBtn';
import useDimmedModal from '@/hooks/useDimmedModal';
import { ModalMentoringType } from '@/types/modal/mentoringDetail';

import { useGetMyMentoringActiveTabQuery } from '@/hooks/query/useGetMyMentoringActiveTab';

import useFullModal from '@/hooks/useFullModal';
import { JMCancelAtom } from '@/stores/condition';
import { REVIEW_FORM_URL } from '@/constants/form/reviewForm';
import { StyledSModalBtn } from '@/components/comon/Button/ModalBtn/ModalBtn.styled';
import MentoringNotYet from '@/components/domain/mentoring/MentoringNotYet';
import { useConfirmMyMentoring } from '@/hooks/mutations/useConfirmMyMentoring';

function convertDateType(date: string) {
  if (!date) return new Date();
  const parts = date.split('-');
  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1;
  const day = parseInt(parts[2]);
  const hour = parseInt(parts[3]);
  const minute = parseInt(parts[4]);

  return new Date(year, month, day, hour, minute);
}
function TabBar() {
  const [modalType, setModalType] = useState<ModalMentoringType>('junior');
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);

  const { data: myMentoringActiveResponse } = useGetMyMentoringActiveTabQuery({
    activeTab,
  });
  const handleTabClick = (tabIndex: tapType) => {
    setActiveTab(tabIndex);
  };
  const [selectedMentoringId, setSelectedMentoringId] = useState<number>(0);

  const applyBtnRef = useRef<HTMLButtonElement>(null);

  const { openModal: openJuniorMentoringCancelModal } = useDimmedModal({
    modalType: 'juniorCancelMent',
    mentoringId: selectedMentoringId ?? 0,
    overlayId: 'openJuniorMentoringCancelModal',
  });

  const {
    openModal: openJuniorMentoringSpecModal,
    closeModal: closeJunuiorMentoringSpec,
  } = useFullModal({
    modalType: 'junior-mentoring-spec',
    selectedMentoringId: selectedMentoringId,
    cancelModalHandler: openJuniorMentoringCancelModal,
  });

  const JMCancel = useAtomValue(JMCancelAtom);

  const { mutate: confirmMyMentoring } = useConfirmMyMentoring();
  useEffect(() => {
    if (JMCancel === true) {
      location.reload();
    }
    setSelectedMentoringId(0);
  }, [activeTab]);

  useEffect(() => {
    if (selectedMentoringId !== 0) {
      openJuniorMentoringSpecModal();
      setSelectedMentoringId(0);
    }
  }, [selectedMentoringId]);

  const mentoConfirmed = async () => {
    const mentoringId = localStorage.getItem('mentoringId');
    if (mentoringId) {
      confirmMyMentoring(
        { mentoringId: Number(mentoringId) },
        {
          onSuccess: () => {
            localStorage.removeItem('mentoringId');
          },
        },
      );
    }
  };

  return (
    <div style={{ height: '100%' }}>
      <TabWrap>
        <TapStyle
          selected={activeTab === TAB.waiting}
          onClick={() => handleTabClick('waiting')}
        >
          확정 대기
        </TapStyle>
        <TapStyle
          selected={activeTab === TAB.expected}
          onClick={() => handleTabClick('expected')}
        >
          진행 예정
        </TapStyle>
        <TapStyle
          selected={activeTab === TAB.done}
          onClick={() => handleTabClick('done')}
        >
          완료
        </TapStyle>
      </TabWrap>
      <TabResultContainer>
        <TabResult>
          <div>
            {myMentoringActiveResponse &&
            myMentoringActiveResponse.length !== 0 ? (
              myMentoringActiveResponse!.map((el) => {
                const mentoringDate = convertDateType(el.date);
                const currentDate = new Date();
                const isPast = mentoringDate < currentDate;

                return (
                  <MentoringBox key={el.mentoringId}>
                    <MentoringApply data={el} />
                    {activeTab === TAB.waiting && (
                      <ModalBtn
                        ref={applyBtnRef}
                        type={'show'}
                        btnText={'내 신청서 보기'}
                        modalHandler={() => {
                          closeJunuiorMentoringSpec(() => {});
                        }}
                        onClick={() => {
                          setModalType('junior');
                          setSelectedMentoringId(el.mentoringId);
                        }}
                      />
                    )}
                    {activeTab === TAB.expected && (
                      <div>
                        {isPast ? (
                          <DateDoneBtn
                            onClick={() => {
                              localStorage.setItem(
                                'mentoringId',
                                el.mentoringId.toString(),
                              );
                              mentoConfirmed();
                            }}
                          >
                            멘토링 완료 확정하기
                          </DateDoneBtn>
                        ) : (
                          <ModalBtn
                            type={'show'}
                            btnText={'내 신청서 보기'}
                            modalHandler={() => {
                              if (selectedMentoringId) {
                                setSelectedMentoringId(selectedMentoringId);
                                if (selectedMentoringId !== 0) {
                                  openJuniorMentoringSpecModal();
                                }
                              }
                            }}
                            onClick={() => {
                              setModalType('junior');
                              setSelectedMentoringId(el.mentoringId);
                            }}
                          />
                        )}
                      </div>
                    )}
                    {activeTab === TAB.done && (
                      <StyledSModalBtn
                        onClick={() => {
                          if (typeof window !== undefined)
                            window.open(
                              REVIEW_FORM_URL,
                              '_blank',
                              'noopener, noreferrer',
                            );
                        }}
                      >
                        리뷰 작성하기
                      </StyledSModalBtn>
                    )}
                  </MentoringBox>
                );
              })
            ) : (
              <MentoringNotYet />
            )}
          </div>
        </TabResult>
      </TabResultContainer>
    </div>
  );
}

export default memo(TabBar);
