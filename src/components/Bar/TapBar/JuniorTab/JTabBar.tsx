'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TapStyle,
  MentoringShowBtn,
  TabWrap,
  TabResult,
  TabResultContainer,
  MentoringBox,
  DateDoneBtn,
} from './JTabBar.styled';
import { useAtom } from 'jotai';
import { activeTabAtom } from '@/stores/tap';
import { tapType } from '@/types/tap/tap';
import { MentoringData } from '@/types/mentoring/mentoring';
import useAuth from '@/hooks/useAuth';
import { TAB, TAB_STATE } from '@/constants/tab/ctap';
import MentoringApply from '@/components/Mentoring/MentoringApply/MentoringApply';
import ModalBtn from '@/components/Button/ModalBtn';
import useModal from '@/hooks/useModal';
import { ModalMentoringType } from '@/types/modal/mentoringDetail';
import MentoringSpec from '@/components/Mentoring/MentoringSpec/JmentoringSpec';
import { createPortal } from 'react-dom';
import MentoringCancel from '@/components/Mentoring/MentoringCancel/MentoringCancel';
import DimmedModal from '@/components/Modal/DimmedModal';
import FullModal from '@/components/Modal/FullModal';
function TabBar() {
  const [modalType, setModalType] = useState<ModalMentoringType>('junior');
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);
  const [data, setData] = useState<MentoringData[] | null>(null);
  const handleTabClick = (tabIndex: tapType) => {
    setActiveTab(tabIndex);
  };
  const { getAccessToken } = useAuth();
  const { modal, modalHandler, portalElement } = useModal(
    'junior-mentoring-detail',
  );
  const {
    modal: cancelModal,
    modalHandler: cancelModalHandler,
    portalElement: cancelPortalElement,
  } = useModal('junior-mentoring-cancel');
  const [selectedMentoringId, setSelectedMentoringId] = useState<number | null>(
    null,
  );
  useEffect(() => {
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
            setData(response.data.data.mentoringInfos);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }
    });
  }, [activeTab]);

  const renderTabContent = () => {
    return (
      <div>
        {data && data!.length !== 0
          ? data!.map((el, idx) => {
              return (
                <MentoringBox key={idx}>
                  <MentoringApply data={el} />
                  {activeTab === TAB.waiting && (
                    <ModalBtn
                      type={'show'}
                      btnText={'내 신청서 보기'}
                      modalHandler={modalHandler}
                      onClick={() => {
                        setModalType('junior');
                        setSelectedMentoringId(el.mentoringId);
                      }}
                    />
                  )}
                  {activeTab === TAB.expected && (
                    <div>
                      {new Date() >= new Date(el.date) ? (
                        <DateDoneBtn>멘토링 완료 확정하기</DateDoneBtn>
                      ) : (
                        <ModalBtn
                          type={'show'}
                          btnText={'내 신청서 보기'}
                          modalHandler={modalHandler}
                          onClick={() => {
                            setModalType('junior');
                            setSelectedMentoringId(el.mentoringId);
                          }}
                        />
                      )}
                    </div>
                  )}
                  {activeTab === TAB.done && (
                    <ModalBtn
                      type={'show'}
                      btnText={'리뷰 작성하기'}
                      modalHandler={modalHandler}
                      onClick={() => {
                        setModalType('junior');
                        setSelectedMentoringId(el.mentoringId);
                      }}
                    />
                  )}
                </MentoringBox>
              );
            })
          : `${TAB_STATE[activeTab]}인 멘토링이 없어요`}
      </div>
    );
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
        <TabResult>{renderTabContent()}</TabResult>
      </TabResultContainer>
      {modal && portalElement
        ? createPortal(
            <FullModal
              modalType="junior-mentoring-spec"
              modalHandler={modalHandler}
              cancelModalHandler={cancelModalHandler}
              mentoringId={selectedMentoringId || 0}
            />,
            portalElement,
          )
        : null}
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

export default TabBar;
