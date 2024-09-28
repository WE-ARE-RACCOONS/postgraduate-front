import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { cn } from '@/lib/utils';

interface CommonSelectPropsType {
  className?: string;
  defaultValue?: string;
  label: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange: (value: string) => void;
}

const CommonSelect = (props: CommonSelectPropsType) => {
  const { label, options, onChange, className, defaultValue } = props;

  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={(value) => onChange(value)}
    >
      <SelectTrigger className={cn(`w-[180px] ${className}`)}>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CommonSelect;
