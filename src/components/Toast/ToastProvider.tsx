'use client';

import { useEffect, useState } from 'react';
import { ToastService } from './ToastService';
import { observerProp } from './ToastService';
import { ToastMessage } from './ToastMessage';

interface message extends observerProp {
  id: string;
}

export function ToastProvider() {
  const [message, setMessage] = useState<message[]>([]);

  useEffect(() => {
    const singleToastService = ToastService.getInstance();

    const addNewToastMessage = (props: observerProp) => {
      if (message.length >= 2) {
        setMessage((prev) => prev.slice(1));
      }

      setMessage((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          message: props.message,
          status: props.status,
        },
      ]);

      const timerId = setTimeout(() => {
        setMessage((prev) => prev.slice(1));
      }, 2000);
      return () => clearTimeout(timerId);
    };
    singleToastService.subscribe(addNewToastMessage);
    return () => singleToastService.unsubscribe(addNewToastMessage);
  }, [message.length]);

  return (
    <>
      {message.map((ms, index) => (
        <ToastMessage key={index} status={ms.status} message={ms.message} />
      ))}
    </>
  );
}
