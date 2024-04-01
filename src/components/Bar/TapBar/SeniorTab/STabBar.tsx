'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TapStyle,
  MentoringMapBox,
  TabWrap,
  TabResultContainer,
  TabResult,
  MentoringBox,
  DoneBtnBox,
  NoMentoring,
} from './STabBrar.styled';
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
import SmentoringSpec from '@/components/Mentoring/MentoringSpec/SmentoringSpec/SmentoringSpec';
import DimmedModal from '@/components/Modal/DimmedModal';
import FullModal from '@/components/Modal/FullModal';
import AccountShowBtn from '@/components/Button/AccountShowBtn/AccountShowBtn';
import SmentoringCancel from '@/components/Mentoring/SmentoringCancel/SmentoringCancel';
import { useRouter } from 'next/navigation';
import findExCode from '@/utils/findExCode';
function STabBar() {
  const router = useRouter();
  const [modalType, setModalType] = useState<ModalMentoringType>('junior');
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);
  const [data, setData] = useState<MentoringData[] | null>(null);
  const handleTabClick = (tabIndex: tapType) => {
    setActiveTab(tabIndex);
  };
  const { getAccessToken, removeTokens } = useAuth();
  const { modal, modalHandler, portalElement } = useModal(
    'senior-mentoring-detail',
  );
  const {
    modal: cancelModal,
    modalHandler: cancelModalHandler,
    portalElement: cancelPortalElement,
  } = useModal('senior-mentoring-cancel');
  const {
    modal: acceptModal,
    modalHandler: acceptModalHandler,
    portalElement: acceptPortalElement,
  } = useModal('senior-mentoring-accept');
  const [selectedMentoringId, setSelectedMentoringId] = useState<number | null>(
    null,
  );
  const [prevMentoringInfoLength, setPrevMentoringInfoLength] = useState(0);
  useEffect(() => {
    getAccessToken().then((Token) => {
      if (Token) {
        const headers = {
          Authorization: `Bearer ${Token}`,
        };
        axios
          .get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/mentoring/senior/me/${activeTab}`,
            {
              headers,
            },
          )
          .then((response) => {
            if (findExCode(response.data.code)) {
              removeTokens();
              router.replace('/');
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
  }, [activeTab,prevMentoringInfoLength]);

  const renderTabContent = () => {
    return (
      <div>
        {data && data!.length !== 0 ? (
          <div>
            {data!.map((el, idx) => (
              <MentoringBox key={idx}>
                <MentoringApply data={el} />
                {activeTab === TAB.waiting || activeTab === TAB.expected ? (
                  <ModalBtn
                    type="seniorShow"
                    btnText={
                      activeTab === TAB.waiting
                        ? '신청서 보고 수락하기'
                        : '신청서 보기'
                    }
                    modalHandler={modalHandler}
                    onClick={() => {
                      setModalType('senior');
                      setSelectedMentoringId(el.mentoringId);
                    }}
                  />
                ) : (
                  ''
                )}
              </MentoringBox>
            ))}
            {activeTab === TAB.done ? (
              <div
                style={{
                  width: '21.44rem',
                  position: 'fixed',
                  bottom: '4.5rem',
                  zIndex: '100',
                }}
              >
                <AccountShowBtn />
              </div>
            ) : (
              ''
            )}
          </div>
        ) : (
          <NoMentoring>{TAB_STATE[activeTab]}인 멘토링이 없어요</NoMentoring>
        )}
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
              modalType="senior-mentoring-spec"
              modalHandler={modalHandler}
              cancelModalHandler={cancelModalHandler}
              acceptModalHandler={acceptModalHandler}
              mentoringId={selectedMentoringId || 0}
            />,
            portalElement,
          )
        : null}
      {cancelModal && cancelPortalElement
        ? createPortal(
            <SmentoringCancel
              modalHandler={cancelModalHandler}
              mentoringId={selectedMentoringId || 0}
            />,
            cancelPortalElement,
          )
        : null}
      {acceptModal && acceptPortalElement
        ? createPortal(
            <FullModal
              modalType="accept-mentoring"
              modalHandler={acceptModalHandler}
            />,
            acceptPortalElement,
          )
        : null}
    </div>
  );
}

export default STabBar;
