import { DependencyList, useEffect, useRef } from 'react';

//뒤로 가 시 들어온 콜백을 실ㅇ
interface useBackEffectProps {
  callback?: () => void;
  dependency?: DependencyList;
}

export function useBackEffect({
  callback,
  dependency = [],
}: useBackEffectProps) {
  const isClickedFirst = useRef(false);
  useEffect(() => {
    if (!isClickedFirst.current && typeof window !== 'undefined') {
      window.history.pushState(null, '', '');
      isClickedFirst.current = true;
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', () => callback?.());
      return () => {
        window.removeEventListener('popstate', () => callback?.());
      };
    }
  }, [...dependency]);
}
