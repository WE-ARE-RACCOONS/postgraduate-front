import { prevPathAtom } from '@/stores/signup';
import { useSetAtom } from 'jotai';
import { usePathname } from 'next/navigation';

function usePrevPath() {
  const setPrevPath = useSetAtom(prevPathAtom);
  const currentPath = usePathname();

  function setCurrentPath() {
    setPrevPath(currentPath);
  }

  return {
    setCurrentPath,
  };
}

export default usePrevPath;
