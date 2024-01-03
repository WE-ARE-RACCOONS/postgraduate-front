'use client';
import { allchecked } from '@/stores/condition';
import { nickname, notDuplicate, phoneNumValidation } from '@/stores/signup';
import { NextBtnProps } from '@/types/button/nextBtn';
import { useAtomValue } from 'jotai';
import { useRouter, usePathname } from 'next/navigation';
import {BtnStyle} from './NextBtn.styled'
function NextBtn(props: NextBtnProps) {
  const userNick = useAtomValue(nickname);
  const notDupli = useAtomValue(notDuplicate);
  const checked = useAtomValue(allchecked);
  const numValidation = useAtomValue(phoneNumValidation);
  const router = useRouter();
  const currentPath = usePathname();

  const handleClick = () => {
    if (props.kind == 'next') {
      if (userNick && notDupli && checked && numValidation) {
        router.push(currentPath + props.url);
      }
      return;
    }

    if (props.kind == 'route') {
      router.push(props.url);
      return;
    }
  };

  return (
  <BtnStyle onClick={handleClick}>{props.btnText}</BtnStyle>
  );
}

export default NextBtn;
