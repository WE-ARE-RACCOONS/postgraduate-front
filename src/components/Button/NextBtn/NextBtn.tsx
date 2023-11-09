'use client';
import { allchecked } from '@/stores/condition';
import { nickname, notDuplicate } from '@/stores/nickname';
import { NextBtnProps } from '@/types/button/nextBtn';
import { useAtomValue } from 'jotai';
import { useRouter, usePathname } from 'next/navigation';

function NextBtn(props: NextBtnProps) {
  const userNick = useAtomValue(nickname);
  const notDupli = useAtomValue(notDuplicate);
  const checked = useAtomValue(allchecked);
  const router = useRouter();
  const currentPath = usePathname();

  const handleClick = () => {
    if (props.kind == 'next') {
      if (userNick && notDupli && checked) {
        router.push(currentPath + props.url);
      }
    }
  };

  return <button onClick={handleClick}>다음으로</button>;
}

export default NextBtn;
