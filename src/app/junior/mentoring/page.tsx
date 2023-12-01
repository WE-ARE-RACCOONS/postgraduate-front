'use client';
import TapBar from '@/components/Bar/TapBar/TapBar';
import React, {useState, useEffect} from 'react';
import useAuth from '@/hooks/useAuth';
import DimmedModal from '@/components/Modal/DimmedModal';
import { createPortal } from 'react-dom';
import useModal from '@/hooks/useModal';
function JuniorMentoringPage() {
  const [flag, setFlag] = useState(false);
  const { getAccessToken } = useAuth();

  useEffect(() => {
    const Token = getAccessToken();
    setFlag(Token == null ? false : true);
  }, [getAccessToken]);  

  const { modal, modalHandler, portalElement } = useModal(
    'login-request-portal',
  );
  return (
    <div>
      {flag ? (
        <TapBar />
      ) : (
        (modal && portalElement ? (
          createPortal(
            <DimmedModal
              modalType="notuser"
              modalHandler={modalHandler}
            />,
            portalElement,
          )
        ) : null)
      )}
    </div>
  );
}

export default JuniorMentoringPage;
