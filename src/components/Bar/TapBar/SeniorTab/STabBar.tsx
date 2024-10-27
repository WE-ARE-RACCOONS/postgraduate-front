'use client';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  TapStyle,
  TabWrap,
  TabResultContainer,
  TabResult,
  MentoringBox,
  NoMentoring,
} from './STabBrar.styled';
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
import FullModal from '@/components/Modal/FullModal';
import AccountShowBtn from '@/components/Button/AccountShowBtn/AccountShowBtn';
import SmentoringCancel from '@/components/Mentoring/SmentoringCancel/SmentoringCancel';
import { useRouter } from 'next/navigation';
import findExCode from '@/utils/findExCode';
import useFullModal from '@/hooks/useFullModal';
import { SMCancelAtom } from '@/stores/condition';
function STabBar() {
  const router = useRouter();
  const [modalType, setModalType] = useState<ModalMentoringType>('junior');
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);
  const [data, setData] = useState<MentoringData[] | null>(null);
  const handleTabClick = (tabIndex: tapType) => {
    setActiveTab(tabIndex);
  };

  const mentoringBtnRef = useRef<HTMLButtonElement>(null);
  const { openModal: openAcceptMentoringModal } = useFullModal({
    modalType: 'accept-mentoring',
  });
  const { getAccessToken, removeTokens } = useAuth();

  const {
    modal: cancelModal,
    modalHandler: cancelModalHandler,
    portalElement: cancelPortalElement,
  } = useModal('senior-mentoring-cancel');

  const {
    modal: successModal,
    modalHandler: successModalHandler,
    portalElement: successPortalElement,
  } = useModal('mentoring-cancel-success');
  const [selectedMentoringId, setSelectedMentoringId] = useState<number | null>(
    null,
  );
  const [prevMentoringInfoLength, setPrevMentoringInfoLength] = useState(0);

  const { openModal: openSeniorMentoringSpecModal } = useFullModal({
    modalType: 'senior-mentoring-spec',
    mentoringId: selectedMentoringId ?? 0,
    cancelModalHandler: cancelModalHandler,
    acceptModalHandler: openAcceptMentoringModal,
  });

  const SMCancel = useAtomValue(SMCancelAtom);
  useEffect(() => {
    if (SMCancel === true) {
      location.reload();
    }
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
              location.reload();
              return;
            }
            setData(response.data.data.seniorMentoringInfos);
            const newMentoringInfos = response.data.data.seniorMentoringInfos;
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
      if (selectedMentoringId === null) {
        mentoringBtnRef?.current?.click();
      }
    });
  }, [activeTab, prevMentoringInfoLength]);

  const renderTabContent = () => {
    return (
      <div>
        {data && data.length !== 0 ? (
          <div>
            {data!.map((el, idx) => (
              <MentoringBox key={idx}>
                <MentoringApply data={el} />
                {activeTab === TAB.waiting || activeTab === TAB.expected ? (
                  <ModalBtn
                    ref={mentoringBtnRef}
                    type="seniorShow"
                    btnText={
                      activeTab === TAB.waiting
                        ? '신청서 보고 수락하기'
                        : '신청서 보기'
                    }
                    modalHandler={() => {
                      router.push('/senior/mentoring');
                    }}
                    onClick={() => {
                      setModalType('senior');
                      setSelectedMentoringId(el.mentoringId);
                      if (selectedMentoringId) {
                        openSeniorMentoringSpecModal();
                      }
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

      {cancelModal && cancelPortalElement
        ? createPortal(
            <SmentoringCancel
              modalHandler={cancelModalHandler}
              successHandler={successModalHandler}
              mentoringId={selectedMentoringId || 0}
            />,
            cancelPortalElement,
          )
        : null}

      {successModal && cancelPortalElement
        ? createPortal(
            <DimmedModal
              modalType="mentoring-cancel-success"
              modalHandler={successModalHandler}
            />,
            cancelPortalElement,
          )
        : null}
    </div>
  );
}

export default STabBar;
