import {
  createContext,
  MutableRefObject,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

interface DescendantContextType {
  reset: () => void;
  get: (id: string) => number;
  map: MutableRefObject<Record<string, { index: number; enabled: boolean }>>;
}

const makeRandomId = () => Math.random().toString(36).substring(1, 9);
const useLayout = typeof window !== 'undefined' ? () => {} : useLayoutEffect;

export const DescendantContext = createContext<
  DescendantContextType | undefined
>(undefined);

export const useDescendats = () => {
  const indexCounter = useRef(0);
  const map = useRef<Record<string, { index: number; enabled: boolean }>>({});
  const reset = () => {
    indexCounter.current = 0;
    map.current = {};
  };

  const get = (id: string) => {
    if (!map.current[id]) {
      map.current[id] = {
        index: indexCounter.current++,
        enabled: true,
      };
    }
    return map.current[id].index;
  };

  return {
    reset,
    map,
    get,
  };
};

export const useDecendant = () => {
  const getContext = useContext(DescendantContext);
  if (!getContext) {
    throw new Error('Decendant Context이 정의되지 않았습니다.');
  }
  const id = useRef<string | undefined>();
  const [index, setIndex] = useState(-1);

  if (!id || !id.current) {
    id.current = makeRandomId();
  }

  useLayout(() => {
    if (id.current) setIndex(getContext?.get(id?.current));
  });

  return index;
};
