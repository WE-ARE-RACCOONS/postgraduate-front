import React from 'react';
import { SearchModalBgBox, SearchModalInput } from './SearchModal.styled';
import { SearchModalProps } from '@/types/modal/search';
import Image from 'next/image';
import search from '../../../../public/search2.png';
import HomeSearchForm from '@/components/Form/HomeSearchForm/HomeSearchForm';
export default function SearchModal(props: SearchModalProps) {
  const ModalClick = () => {
    props.modalHandler();
  };

  return (
    <SearchModalBgBox onClick={ModalClick}>
      <SearchModalInput onClick={(e) => e.stopPropagation()}>
        <Image
          id="search"
          src={search}
          alt="검색"
          width={32}
          height={32}
          priority
          style={{
            position: 'absolute',
            top: '62%',
            left: '3%',
          }}
        />
        <HomeSearchForm modalHandler={props.modalHandler} />
      </SearchModalInput>
    </SearchModalBgBox>
  );
}
