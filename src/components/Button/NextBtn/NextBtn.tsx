'use client';
import { essential } from '@/stores/condition';
import { nickname, notDuplicate, phoneNumValidation } from '@/stores/signup';
import { NextBtnProps } from '@/types/button/nextBtn';
import { useAtomValue } from 'jotai';
import { useRouter, usePathname } from 'next/navigation';
import {
  BtnStyle,
  BtnStylePrev,
  BtnStyleNon,
  BtnStyleNonM,
} from './NextBtn.styled';
function NextBtn(props: NextBtnProps) {
  const userNick = useAtomValue(nickname);
  const notDupli = useAtomValue(notDuplicate);
  const checked = useAtomValue(essential);
  const numValidation = useAtomValue(phoneNumValidation);
  const router = useRouter();
  const currentPath = usePathname();

  const handleClick = () => {
    if (props.kind == 'next') {
      router.push(currentPath + props.url);
      return;
    }

    if (props.kind == 'route') {
      if (props.onClick) {
        props.onClick();
      }
      if (props.url) {
        router.push(props.url);
      }
      return;
    }
    if (props.kind == 'prev') {
      if (props.url) {
        router.push(props.url);
      }
      return;
    }
  };

  return (
    <div>
      {props.kind == 'next' && (
        <BtnStyle onClick={handleClick}>{props.btnText}</BtnStyle>
      )}
      {props.kind == 'route' && (
        <BtnStyle onClick={handleClick}>{props.btnText}</BtnStyle>
      )}
      {props.kind == 'route-non' && (
        <BtnStyleNon onClick={handleClick}>{props.btnText}</BtnStyleNon>
      )}
      {props.kind == 'prev' && (
        <BtnStylePrev onClick={handleClick}>{props.btnText}</BtnStylePrev>
      )}
      {props.kind == 'route-non-matching' && (
        <BtnStyleNonM>{props.btnText}</BtnStyleNonM>
      )}
    </div>
  );
}

export default NextBtn;
