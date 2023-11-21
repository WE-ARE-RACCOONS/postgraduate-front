import { prevPathAtom } from '@/stores/signup';
import { useSetAtom } from 'jotai';
import { usePathname } from 'next/navigation';

export function savePrevPath() {
  const setPrevPath = useSetAtom(prevPathAtom);
  const currentPath = usePathname();
  setPrevPath(currentPath);
}