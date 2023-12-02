import React from 'react'
import {SearchModalBgBox,
    SearchModalInput,
} from './SearchModal.styled'
import { SearchModalProps } from '@/types/modal/search'
import Image from 'next/image';
import search from '../../../../public/search.png';
import HomeSearchForm from '@/components/SingleForm/HomeSearchForm/HomeSearchForm';
export default function SearchModal(props : SearchModalProps) {
  return (
   <SearchModalBgBox>
    <SearchModalInput>
    <Image
          id="search"
          src={search}
          alt="검색"
          sizes="(max-width: 600px) 3.rem"
          priority
          style={{
            position: 'absolute',
            top: '65%',
            left: '3%',
          }}
          
        />
        <HomeSearchForm/>

    </SearchModalInput>
   </SearchModalBgBox>
  )
}
