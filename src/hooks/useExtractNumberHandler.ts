import { ChangeEventHandler } from 'react';
import { numberExtract } from '@/utils/numberExtract';

export const useExtractNumberHandler =
  <T extends HTMLInputElement | HTMLTextAreaElement>(): ChangeEventHandler<T> =>
  (e) => {
    const value = e.currentTarget.value;

    const onlyNumber = numberExtract(value);

    e.currentTarget.value = onlyNumber ?? '';
  };
