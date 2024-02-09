'use client';
import React, { useState, KeyboardEvent } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  HomeSearchFormBox,
  HomeSearchFormInput,
} from './HomeSearchForm.styled';

function HomeSearchForm() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const handleInputChange = (e: React.ChangeEvent<any>) => {
    setSearchTerm(e.target.value);
  };

  const keyPressDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`/search-results?searchTerm=${searchTerm}`);
    }
  };
  return (
    <HomeSearchFormBox>
      <HomeSearchFormInput
        type="text"
        placeholder="대학원, 연구실명, 연구분야로 검색하기"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={keyPressDown}
      />
    </HomeSearchFormBox>
  );
}

export default HomeSearchForm;
