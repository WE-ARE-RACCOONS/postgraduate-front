'use client';
import React, { useState, useEffect, memo, useRef } from 'react';
import axios from 'axios';
import {
  TapStyle,
  TabWrap,
  TabResult,
  TabResultContainer,
  MentoringBox,
  DateDoneBtn,
  NoMentoring,
} from './JTabBar.styled';
import { useAtom, useAtomValue } from 'jotai';
import { activeTabAtom } from '@/stores/tap';
import { tapType } from '@/types/tap/tap';
import { MentoringData } from '@/types/mentoring/mentoring';
import useAuth from '@/hooks/useAuth';
import { TAB, TAB_STATE } from '@/constants/tab/ctap';
import MentoringApply from '@/components/Mentoring/MentoringApply/MentoringApply';
import ModalBtn from '@/components/Button/ModalBtn';
import useModal from '@/hooks/useModal';
import { ModalMentoringType } from '@/types/modal/mentoringDetail';
import { createPortal } from 'react-dom';
import DimmedModal from '@/components/Modal/DimmedModal';
import { useRouter } from 'next/navigation';
import findExCode from '@/utils/findExCode';
import useFullModal from '@/hooks/useFullModal';
import { JMCancelAtom } from '@/stores/condition';
import { REVIEW_FORM_URL } from '@/constants/form/reviewForm';
import { StyledSModalBtn } from '@/components/Button/ModalBtn/ModalBtn.styled';
import MentoringNotYet from '@/components/MentoringNotYet';

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
  const router = useRouter();
  const [modalType, setModalType] = useState<ModalMentoringType>('junior');
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);
  const [data, setData] = useState<MentoringData[] | null>(null);
  const handleTabClick = (tabIndex: tapType) => {
    setActiveTab(tabIndex);
  };
  const { getAccessToken, removeTokens } = useAuth();

  const {
    modal: cancelModal,
    modalHandler: cancelModalHandler,
    portalElement: cancelPortalElement,
  } = useModal('junior-mentoring-cancel');
  const [selectedMentoringId, setSelectedMentoringId] = useState<number>(0);
  const applyBtnRef = useRef<HTMLButtonElement>(null);
  const {
    openModal: openJuniorMentoringSpecModal,
    closeModal: closeJunuiorMentoringSpec,
  } = useFullModal({
    modalType: 'junior-mentoring-spec',
    selectedMentoringId: selectedMentoringId,
  });

  const [prevMentoringInfoLength, setPrevMentoringInfoLength] = useState(0);
  const JMCancel = useAtomValue(JMCancelAtom);

  useEffect(() => {
    let prevMentoringInfoLength = 0;
    if (JMCancel === true) {
      location.reload();
    }
    getAccessToken().then((Token) => {
      if (Token) {
        const headers = {
          Authorization: `Bearer ${Token}`,
        };
        axios
          .get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/mentoring/me/${activeTab}`,
            {
              headers,
            },
          )
          .then((response) => {
            if (findExCode(response.data.code)) {
              removeTokens();
              location.reload();
              return;
            }
            setData(response.data.data.mentoringInfos);
            const newMentoringInfos = response.data.data.mentoringInfos;
            const newMentoringInfoLength = newMentoringInfos.length;
            if (newMentoringInfoLength !== prevMentoringInfoLength) {
              setData(newMentoringInfos);
            }
            setPrevMentoringInfoLength(newMentoringInfoLength);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }
    });
    if (activeTab === TAB.waiting && selectedMentoringId === 0) {
      applyBtnRef.current?.click();
    }
  }, [activeTab, prevMentoringInfoLength]);

  const mentoConfirmed = async () => {
    const mentoringId = localStorage.getItem('mentoringId');
    getAccessToken().then(async (Token) => {
      if (Token) {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        };

        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/mentoring/me/${mentoringId}/done`,
          {
            mentoringId: mentoringId,
          },
          { headers },
        );

        if (findExCode(response.data.code)) {
          removeTokens();
          location.reload();
          return;
        }

        const confirm = response.data;
        localStorage.removeItem('mentoringId');
        location.reload();
      }
    });
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
            {data && data.length !== 0 ? (
              data!.map((el, idx) => {
                const mentoringDate = convertDateType(el.date);
                const currentDate = new Date();
                const isPast = mentoringDate < currentDate;

                return (
                  <MentoringBox key={idx}>
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
                          if (selectedMentoringId !== 0) {
                            openJuniorMentoringSpecModal();
                          }
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

      {cancelModal && cancelPortalElement
        ? createPortal(
            <DimmedModal
              modalType="juniorCancelMent"
              modalHandler={cancelModalHandler}
              mentoringId={selectedMentoringId || 0}
            />,
            cancelPortalElement,
          )
        : null}
    </div>
  );
}

export default memo(TabBar);
