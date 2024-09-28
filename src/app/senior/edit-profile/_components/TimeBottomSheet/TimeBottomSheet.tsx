'use client';

import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';

import { SeniorInfoResponse } from '@/api/senior/me/seniorInfoGetFetch';

import { SeniorProfileFormType } from '../EditForm/EditForm';
import { Button } from '@/components/ui/button';
import { BottomSheet } from '@/components/BottomSheet';
import { Label } from '@/components/ui/label';
import { DayRadioButton } from '@/components/DayRadioButton';
import { Select } from '@/components/Select';
import { ErrorMessage } from '@/components/ErrorMessage';

import { DAY, HOUR, MINUTES } from '../../constants';
import { overlay } from 'overlay-kit';
import { Alert } from '@/components/Alert';

import { validateDayField, validateTimeField } from './util';

export interface AddTimeItemsType
  extends Omit<
    ArrayType<PropType<PropType<SeniorInfoResponse, 'data'>, 'times'>>,
    'startTime' | 'endTime'
  > {
  startTime: {
    hour: string;
    minutes: string;
  };

  endTime: {
    hour: string;
    minutes: string;
  };
}

export interface TImeBottomSheetPropsType {
  isOpen: boolean;
  onClose: () => void;
}

const initialState = {
  id: '',
  day: '',
  startTime: {
    hour: '09',
    minutes: '00',
  },
  endTime: {
    hour: '09',
    minutes: '00',
  },
};

const TimeBottomSheet = ({ isOpen, onClose }: TImeBottomSheetPropsType) => {
  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext<SeniorProfileFormType>();

  const { append, remove } = useFieldArray({
    control,
    name: 'times',
  });

  const watchTimes = useWatch({
    control,
    name: 'times',
  }) satisfies PropType<SeniorProfileFormType, 'times'>;

  const [time, setTime] = useState<AddTimeItemsType>(initialState);

  const handleTimeSubmit = async () => {
    if (!validateDayField(time)) {
      overlay.open(({ isOpen, close }) => {
        return (
          <Alert
            isOpen={isOpen}
            title="요일 선택 확인"
            buttonSlot={
              <Button className="py-6 w-full font-bold text-lg" onClick={close}>
                확인했어요
              </Button>
            }
          >
            요일은 필수 선택 값이에요
          </Alert>
        );
      });

      return;
    }

    if (!validateTimeField(time)) {
      overlay.open(({ isOpen, close }) => {
        return (
          <Alert
            isOpen={isOpen}
            title="시간 확인"
            buttonSlot={
              <Button className="py-6 w-full font-bold text-lg" onClick={close}>
                확인했어요
              </Button>
            }
          >
            종료 시간이 시작 시간보다 빠르거나 같을 수 없어요. 다시 선택해주세요
          </Alert>
        );
      });

      return;
    }

    if (!errors.times) {
      append({
        ...time,
        id: uuidv4(),
        startTime: `${time.startTime.hour}:${time.startTime.minutes}`,
        endTime: `${time.endTime.hour}:${time.endTime.minutes}`,
      });
    }

    if (!(await trigger(`times`))) {
      return;
    }

    setTime({
      id: '',
      day: '',
      startTime: {
        hour: '',
        minutes: '',
      },
      endTime: {
        hour: '',
        minutes: '',
      },
    });

    onClose();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={() => {
        if (watchTimes) {
          if (errors?.times?.[watchTimes.length - 1] && watchTimes) {
            remove(watchTimes.length - 1);
          }
        }

        onClose();
      }}
      title="요일 및 시간 설정"
    >
      <div>
        <Label htmlFor="daySelect" className="block font-light text-lg mb-2">
          <div id="daySelect">요일 설정</div>
        </Label>
        <div className="flex items-center justify-between">
          {DAY.map((day, index) => {
            return (
              <DayRadioButton
                key={index}
                label={day}
                time={time}
                setTime={setTime}
              />
            );
          })}
        </div>
        {watchTimes && errors.times && errors?.times[watchTimes.length - 1] ? (
          <ErrorMessage>
            {errors.times
              ? `* ${errors.times[watchTimes.length - 1]?.day?.message}`
              : null}
          </ErrorMessage>
        ) : null}
      </div>

      <div className="mt-6">
        <Label htmlFor="timeSelect" className="block font-light text-lg my-2">
          <div id="timeSelect">시간 선택</div>
        </Label>

        <div className="startTime mt-4">
          <Label htmlFor="startTimeSelect" className="block font-light mb-2">
            <div id="startTimeSelect">시작 시간</div>
          </Label>

          <div className="flex justify-between items-center">
            <Select
              className="w-32"
              defaultValue="09"
              label="시"
              options={HOUR}
              onChange={(value) => {
                setTime((prev) => ({
                  ...prev,
                  startTime: {
                    ...prev.startTime,
                    hour: value,
                  },
                }));
              }}
            />
            <span>시</span>

            <Select
              className="w-32"
              defaultValue="00"
              label="분"
              options={MINUTES}
              onChange={(value) =>
                setTime((prev) => ({
                  ...prev,
                  startTime: {
                    ...prev.startTime,
                    minutes: value,
                  },
                }))
              }
            />
            <span>분</span>

            <span>부터 </span>
          </div>
        </div>

        <div className="endTime mt-4">
          <Label htmlFor="endTimeSelect" className="block font-light mb-2">
            <div id="endTimeSelect">종료 시간</div>
          </Label>

          <div className="flex justify-between items-center">
            <Select
              className="w-32"
              defaultValue="09"
              label="시"
              options={HOUR}
              onChange={(value) =>
                setTime((prev) => ({
                  ...prev,
                  endTime: {
                    ...prev.endTime,
                    hour: value,
                  },
                }))
              }
            />
            <span>시</span>

            <Select
              className="w-32"
              defaultValue="00"
              label="분"
              options={MINUTES}
              onChange={(value) =>
                setTime((prev) => ({
                  ...prev,
                  endTime: {
                    ...prev.endTime,
                    minutes: value,
                  },
                }))
              }
            />
            <span>분</span>

            <span>까지</span>
          </div>
        </div>
      </div>

      <Button
        className="w-11/12 h-12 rounded-lg ml-3 mt-24 font-semibold text-lg"
        onClick={handleTimeSubmit}
      >
        등록하기
      </Button>
    </BottomSheet>
  );
};

export default TimeBottomSheet;
