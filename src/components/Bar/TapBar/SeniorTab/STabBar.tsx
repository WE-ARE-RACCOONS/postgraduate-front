'use client';
import React, { useState, useEffect, useRef } from 'react';
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
import { useGetSeniorMentoringActiveTabQuery } from '@/hooks/query/useGetSeniorMentoringActiveTab';

import { TAB, TAB_STATE } from '@/constants/tab/ctap';
import MentoringApply from '@/components/domain/mentoring/MentoringApply/MentoringApply';
import ModalBtn from '@/components/common/Button/ModalBtn';
import { ModalMentoringType } from '@/types/modal/mentoringDetail';

import AccountShowBtn from '@/components/common/Button/AccountShowBtn/AccountShowBtn';
import { useRouter } from 'next/navigation';
import useFullModal from '@/hooks/useFullModal';
import { SMCancelAtom } from '@/stores/condition';
import useDimmedModal from '@/hooks/useDimmedModal';
function STabBar() {
  const router = useRouter();
  const [modalType, setModalType] = useState<ModalMentoringType>('junior');
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);

  const [selectedMentoringId, setSelectedMentoringId] = useState<number | null>(
    null,
  );

  const handleTabClick = (tabIndex: tapType) => {
    setActiveTab(tabIndex);
  };

  const mentoringBtnRef = useRef<HTMLButtonElement>(null);

  const { openModal: openSeniorMentoringSuccessModal } = useDimmedModal({
    modalType: 'mentoring-cancel-success',
    overlayId: 'openSeniorMentoringSuccessModal',
  });

  const { openModal: openSenoirMentoringCancelSuccessModal } = useDimmedModal({
    modalType: 'mentoring-cancel-success',
    overlayId: 'openSeniorMentoringCancelSucessModal',
  });

  const { openModal: openSeniorMentoringRefuseModal } = useDimmedModal({
    modalType: 'cancelMent',
    overlayId: 'openSeniorMentoringRefuseModal',
    mentoringId: selectedMentoringId ?? 0,
    successHandler: openSeniorMentoringSuccessModal,
    modalHandler: openSenoirMentoringCancelSuccessModal,
  });

  const { openModal: openAcceptMentoringModal } = useFullModal({
    modalType: 'accept-mentoring',
    cancelModalHandler: openSeniorMentoringRefuseModal,
    modalHandler: openSeniorMentoringSuccessModal,
  });

  const { openModal: openSeniorMentoringSpecModal } = useFullModal({
    modalType: 'senior-mentoring-spec',
    mentoringId: selectedMentoringId ?? 0,
    cancelModalHandler: openSeniorMentoringRefuseModal,
    acceptModalHandler: openAcceptMentoringModal,
  });

  const SMCancel = useAtomValue(SMCancelAtom);
  const { data: seniorMentoringActiveTabResponse } =
    useGetSeniorMentoringActiveTabQuery({ activeTab });
  useEffect(() => {
    if (SMCancel === true) {
      location.reload();
    }
    setSelectedMentoringId(null);
  }, [activeTab]);

  useEffect(() => {
    if (selectedMentoringId !== null) {
      openSeniorMentoringSpecModal();
      setSelectedMentoringId(null);
    }
  }, [selectedMentoringId]);

  const renderTabContent = () => {
    return (
      <div>
        {seniorMentoringActiveTabResponse &&
        seniorMentoringActiveTabResponse.length !== 0 ? (
          <div>
            {seniorMentoringActiveTabResponse!.map((el) => (
              <MentoringBox key={el.mentoringId}>
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
    </div>
  );
}

export default STabBar;
