'use client';
import { useState, useEffect } from 'react';

function useModal(portalId: string) {
  const [modal, setModal] = useState(false);
  const [portalElement, setPortalElement] = useState<Element | null>(null);

  useEffect(() => {
    const portalIdEl = document.getElementById(portalId);
    if (!portalIdEl) {
      return;
    }
    setPortalElement(portalIdEl);
  }, [modal]);

  const modalHandler = () => {
    setModal(!modal);
  };

  return {
    modal,
    modalHandler,
    portalElement,
  };
}

export default useModal;
