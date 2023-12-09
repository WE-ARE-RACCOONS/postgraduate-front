'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TapStyle, MentoringMapBox } from './STabBrar.styled';
import { useAtom } from 'jotai';
import { activeTabAtom } from '@/stores/tap';
import { tapType } from '@/types/tap/tap';
import { MentoringData } from '@/types/mentoring/mentoring';
import useAuth from '@/hooks/useAuth';
import { TAB_STATE } from '@/constants/tab/ctap';
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
function STabBar() {
  const [modalType, setModalType] = useState<ModalMentoringType>('junior');
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);
  const [data, setData] = useState<MentoringData[] | null>(null);
  const handleTabClick = (tabIndex: tapType) => {
    setActiveTab(tabIndex);
  };
  const { getAccessToken } = useAuth();
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
  useEffect(() => {
    const Token = getAccessToken();
    console.log(Token)
    const headers = {
      Authorization: `Bearer ${Token}`,
    };
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/mentoring/senior/me/${activeTab}`, {
        headers,
      })
      .then((response) => {
        console.log(response.data.data.seniorMentoringInfos)
        setData(response.data.data.seniorMentoringInfos);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [activeTab]);
  const renderTabContent = () => {
    return (
      <div>
        {data && data!.length !== 0
          ? data!.map((el, idx) => {
              return (
                <div key={idx}>
                  <MentoringApply data={el} />
                  <ModalBtn
                    btnText={'신청서 보고 수락하기'}
                    modalHandler={modalHandler}
                    onClick={() => {
                      setModalType('senior');
                      setSelectedMentoringId(el.mentoringId);
                    }}
                  />
                </div>
              );
            })
          : `${TAB_STATE[activeTab]}인 멘토링이 없어요`}
      </div>
    );
  };
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <TapStyle onClick={() => handleTabClick('waiting')}>확정 대기</TapStyle>
        <TapStyle onClick={() => handleTabClick('expected')}>
          진행 예정
        </TapStyle>
        <TapStyle onClick={() => handleTabClick('done')}>완료</TapStyle>
      </div>
      <div>{renderTabContent()}</div>
      {modal && portalElement
        ? createPortal(
            <SmentoringSpec
              modalHandler={modalHandler}
              cancelModalHandler={cancelModalHandler}
              acceptModalHandler = {acceptModalHandler}
              mentoringId={selectedMentoringId || 0}
            />,
            portalElement,
          )
        : null}
      {cancelModal && cancelPortalElement
        ? createPortal(
            <DimmedModal
              modalType = 'cancelMent' 
              modalHandler={cancelModalHandler}
              mentoringId={selectedMentoringId || 0}
            />,
            cancelPortalElement,
          )
        : null}
        {acceptModal && acceptPortalElement
        ? createPortal(
            <FullModal
              modalType = 'accept-mentoring' 
              modalHandler={acceptModalHandler}
            />,
            acceptPortalElement,
          )
        : null}
    </div>
  );
}

export default STabBar;
