'use client';
import React, { KeyboardEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryState, parseAsString } from 'nuqs';

import {
  HomeSearchFormBox,
  HomeSearchFormInput,
} from './HomeSearchForm.styled';
import { SearchModalProps } from '@/types/modal/search';

function HomeSearchForm(props: SearchModalProps) {
  const [search, setSearch] = useQueryState(
    'q',
    parseAsString.withDefault('').withOptions({
      history: 'replace',
      clearOnDefault: true,
    }),
  );

  useEffect(() => {
    return () => {
      setSearch('');
    };
  }, []);
  const router = useRouter();
  const handleInputChange = (e: React.ChangeEvent<any>) => {
    setSearch(e.target.value);
  };

  const keyPressDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      props.modalHandler();
      router.push(`/search-results?searchTerm=${search}`);
    }
  };
  return (
    <HomeSearchFormBox>
      <HomeSearchFormInput
        type="text"
        placeholder="대학원, 연구실명, 연구분야로 검색하기"
        value={search}
        onChange={handleInputChange}
        onKeyDown={keyPressDown}
      />
    </HomeSearchFormBox>
  );
}

export default HomeSearchForm;
