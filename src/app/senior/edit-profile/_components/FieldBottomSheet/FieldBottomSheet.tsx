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
import { X, Check, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { overlay } from 'overlay-kit';
import { Alert } from '@/components/Alert';

export interface FieldBottomSheetPropsType {
  isOpen: boolean;
  onClose: () => void;
}

const FieldBottomSheet = ({ isOpen, onClose }: FieldBottomSheetPropsType) => {
  const { getValues, setValue } = useFormContext<SeniorProfileFormType>();

  const selectedField = getValues('field');

  const filteredFixTag = selectedField.filter((field) =>
    FIELDS.includes(field),
  );

  const filteredNonFixTag = selectedField.filter(
    (field) => !FIELDS.includes(field),
  );

  const [fieldState, setFieldState] = useState<string[]>(filteredFixTag);
  const [userFieldState, setUserFieldState] =
    useState<string[]>(filteredNonFixTag);

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
    const result = [...fieldState, ...userFieldState];

    if (result.length <= 0) {
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
            연구분야는 최소 1개 이상 입력해주세요.
          </Alert>
        );
      });
      return;
    }

    setValue('field', result);

    onClose();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="연구분야에 대해 알려주세요"
    >
      <div>
        <Label
          htmlFor="lab"
          className="flex items-center w-full text-[#212529] font-semibold"
        >
          <div id="lab" className="font-light">
            연구분야
            <span className="text-[#00a0e1] pl-2">*</span>
          </div>
          <span className="cursor-pointer text-[#00a0e1] font-light">
            최소 1개 이상을 선택해주세요
          </span>
        </Label>
        <p className="text-xs leading-4 mt-2 text-gray-500">
          연구실이 연구중인 분야를 선택하거나 <br /> 직접 입력해주세요
        </p>
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <div className="flex flex-col items-center">
            <Label className="self-baseline font-light text-gray-600 mb-2">
              고정 태그
            </Label>

            <div className="flex items-center gap-2 flex-wrap">
              {FIELDS.map((item, i) => (
                <Badge
                  key={i}
                  className={cn(
                    `py-2 cursor-pointer text-[13px] font-light ${
                      fieldState.includes(item)
                        ? 'bg-primary hover:bg-primary-hover active:bg-primary-active'
                        : 'bg-[#ccc] hover:bg-[#b3b3b3] active:bg-[#999999]'
                    }`,
                  )}
                  onClick={() => {
                    if (fieldState.includes(item)) {
                      setFieldState([
                        ...fieldState.filter((field) => field !== item),
                      ]);
                    } else {
                      setFieldState([...fieldState, `${item}`]);
                    }
                  }}
                >
                  {item.trim()}
                  {fieldState.includes(item) ? (
                    <X
                      className="ml-2"
                      size={12}
                      fill="#ccc"
                      stroke="#000"
                      strokeWidth={1.6}
                    />
                  ) : (
                    <Check
                      className="ml-2"
                      size={12}
                      stroke="#000"
                      strokeWidth={1.6}
                    />
                  )}
                </Badge>
              ))}
            </div>
          </div>

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
          placeholder="연구분야를 직접 입력해주세요"
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

export default FieldBottomSheet;
