'use client';

import { useState, useRef } from 'react';

import { BottomSheet } from '@/components/BottomSheet';
import { Input } from '@/components/ui/input';

import { Label } from '@/components/ui/label';

import { FIELDS } from '../../constants';
import { Badge } from '@/components/ui/badge';

import { useFormContext } from 'react-hook-form';
import { SeniorProfileFormType } from '../EditForm/EditForm';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { overlay } from 'overlay-kit';
import { Alert } from '@/components/Alert';

export interface KeywordBottomSheetPropsType {
  isOpen: boolean;
  onClose: () => void;
}

const KeywordBottomSheet = ({
  isOpen,
  onClose,
}: KeywordBottomSheetPropsType) => {
  const { getValues, setValue } = useFormContext<SeniorProfileFormType>();

  const selectedField = getValues('keyword');

  const [userFieldState, setUserFieldState] = useState<string[]>(selectedField);

  const userInputRef = useRef<HTMLInputElement>(null);

  const handleUserFieldAdd = () => {
    const userInput = (userInputRef.current?.value ?? '').trim();
    if (!userInput) {
      overlay.open(({ isOpen, close }) => {
        return (
          <Alert
            isOpen={isOpen}
            title="연구분야 입력 확인"
            buttonSlot={
              <Button className="py-6 w-full font-bold text-lg" onClick={close}>
                확인했어요
              </Button>
            }
          >
            연구분야는 최소 1자 이상이여야 해요.
          </Alert>
        );
      });

      return;
    }

    setUserFieldState((prev) => [...prev, userInputRef.current?.value ?? '']);

    if (userInputRef.current) {
      userInputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    if (userFieldState.length <= 0) {
      overlay.open(({ isOpen, close }) => {
        return (
          <Alert
            isOpen={isOpen}
            title="연구주제 입력 확인"
            buttonSlot={
              <Button className="py-6 w-full font-bold text-lg" onClick={close}>
                확인했어요
              </Button>
            }
          >
            연구주제는 최소 1개 이상 입력해주세요.
          </Alert>
        );
      });
      return;
    }

    setValue('keyword', userFieldState);

    onClose();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="연구주제에 대해 알려주세요"
    >
      <div>
        <Label
          htmlFor="lab"
          className="flex items-center w-full text-[#212529] font-semibold"
        >
          <div id="lab" className="font-light">
            연구주제
            <span className="text-[#00a0e1] pl-2">*</span>
          </div>
          <span className="cursor-pointer text-[#00a0e1] font-light">
            최소 1개 이상을 선택해주세요
          </span>
        </Label>
        <p className="text-xs leading-4 mt-2 text-gray-500">
          연구실의 연구 주제를 잘 설명하는 키워드를 알려주세요. <br /> 키워드
          입력 후 '입력완료' 버튼을 누르면 추가됩니다.
        </p>
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          {userFieldState.length > 0 && (
            <div className="flex flex-col items-center mt-4">
              <Label className="self-baseline font-light text-gray-600 mb-2">
                직접 추가한 태그
              </Label>

              <div className="flex items-center gap-2 flex-wrap">
                {userFieldState.map((item, i) => (
                  <Badge
                    key={i}
                    className={cn(
                      `py-2 cursor-pointer text-[13px] font-light ${
                        userFieldState.includes(item) &&
                        'bg-primary hover:bg-primary-hover active:bg-primary-active'
                      }`,
                    )}
                    onClick={() => {
                      if (userFieldState.includes(item)) {
                        setUserFieldState([
                          ...userFieldState.filter((field) => field !== item),
                        ]);
                      } else {
                        setUserFieldState([...userFieldState, `${item}`]);
                      }
                    }}
                  >
                    {item.trim()}
                    {userFieldState.includes(item) && (
                      <X
                        className="ml-2"
                        size={12}
                        fill="#ccc"
                        stroke="#000"
                        strokeWidth={1.6}
                      />
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center gap-2">
        <Input
          ref={userInputRef}
          className="h-12 placeholder:text-[#909090] block w-full px-3 py-2 border border-[#c2cede] rounded-md focus:outline-none"
          placeholder="연구주제를 직접 입력해주세요"
        />
        <Button
          variant="ghost"
          onClick={handleUserFieldAdd}
          className="h-[3.2rem] w-fit ml-auto px-2.5 py-2 font-semibold text-primary hover:text-primary-hover active:text-primary-active"
        >
          입력완료
        </Button>
      </div>

      <Button
        className="w-full h-12 rounded-lg mt-24 font-semibold text-lg"
        onClick={handleSubmit}
      >
        등록하기
      </Button>
    </BottomSheet>
  );
};

export default KeywordBottomSheet;
