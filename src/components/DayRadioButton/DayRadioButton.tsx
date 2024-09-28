'use client';

import { cn } from '@/lib/utils';

import { AddTimeItemsType } from '@/app/senior/edit-profile/_components/TimeBottomSheet/TimeBottomSheet';
import { Dispatch, SetStateAction } from 'react';

export interface DayRadioButtonPropsType {
  label: string;
  time: AddTimeItemsType;
  setTime: Dispatch<SetStateAction<AddTimeItemsType>>;
}

const DayRadioButton = (props: DayRadioButtonPropsType) => {
  const { label, time, setTime } = props;

  return (
    <div
      className={cn(
        `bg-[#dee2e6] text-gray-700 px-4 py-3 w-fit cursor-pointer rounded-lg ${
          time.day === label && 'bg-primary text-white'
        }`,
      )}
      onClick={() =>
        setTime({
          ...time,
          day: label,
        })
      }
    >
      {label}
    </div>
  );
};

export default DayRadioButton;
