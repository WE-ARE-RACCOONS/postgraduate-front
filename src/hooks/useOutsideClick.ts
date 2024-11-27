import { DOMElement, RefObject, useEffect } from 'react';

interface useOutsideClickProps {
  ref: RefObject<HTMLElement | null>;
  handler?: (e: Event) => void;
}

const EVENT = 'mousedown';

export const useOutSideClick = (props: useOutsideClickProps) => {
  const { ref, handler } = props;
  useEffect(() => {
    const listener = (event: Event) => {
      if (event.target === null) {
        return;
      }
      if (!ref || !ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler?.(event);
    };

    document.addEventListener(EVENT, listener);
    return () => document.removeEventListener(EVENT, listener);
  }, []);
};
