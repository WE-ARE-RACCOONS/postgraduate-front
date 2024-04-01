'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import SeniorProfile from '@/components/SeniorProfile/SeniorProfile';
import axios from 'axios';
import Image from 'next/image';
import arrow from '../../../public/arrow.png';
import SearchDropDown from '@/components/DropDown/SearchDropDown';
import useModal from '@/hooks/useModal';
import SearchModal from '@/components/Modal/SearchModal';
import { createPortal } from 'react-dom';
import Spinner from '@/components/Spinner';
import { SeniorProfileData } from '@/types/profile/seniorProfile';

function SearchResultPage() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('searchTerm');
  const router = useRouter();
  const [sort, setSort] = useState('');
  const [data, setData] = useState<Array<SeniorProfileData>>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [length, setLength] = useState(0);
  const {
    modal: searchModal,
    modalHandler: searchModalHandler,
    portalElement: searchPortalElement,
  } = useModal('search-portal');

  useEffect(() => {
    setIsLoading(true);
    if (searchTerm) {
      let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/senior/search?find=${searchTerm}`;
      if (sort) {
        url += `&sort=${sort}`;
      }

      axios
        .get(url)
        .then((res) => {
          setIsLoading(false);
          setData(res.data.data.seniorSearchResponses);
          setLength(res.data.data.totalElements);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [searchTerm, sort]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  useEffect(() => {
    const infiniteBottom = () => {
      let isScrollAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 1;
      if (isScrollAtBottom) {
        let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/senior/search?find=${searchTerm}`;
        if (sort) {
          url += `&sort=${sort}`;
        }
        url += `&page=${page + 1}`;

        axios.get(url)
        .then((response) => {
          const res = response.data;
          if(res.code == 'SNR200') {
            setData((data) => [...data, ...res.data.seniorSearchResponses]);
            setPage((page) => res.data.totalElements / 10 <= page ? page : page + 1);
          }
        })
        .catch((err) => {
          console.error(err);
        });
      }
    };

    window.addEventListener('scroll', infiniteBottom);
    window.addEventListener('touchmove', infiniteBottom);

    return () => {
      window.removeEventListener('scroll', infiniteBottom);
      window.removeEventListener('touchmove', infiniteBottom);
    };
  }, [page]);

  return (
    <>
      <SearchReasult>
        <SearchReasultOut
          onClick={() => {
            router.back();
          }}
        >
          <Image
            id="arrow"
            src={arrow}
            alt="뒤로가기"
            sizes="(max-width: 600px) 1.rem"
            priority
            style={{
              width: '1.5rem',
              height: '1.5rem',
              cursor: 'pointer',
            }}
          />
        </SearchReasultOut>
        <SearchReasultTerm onClick={searchModalHandler}>
          {searchTerm}
        </SearchReasultTerm>
      </SearchReasult>
      <Searchfilter>
        <SearchFcount>총 {length}건</SearchFcount>
        <SearchFilter>
          <SearchDropDown onChange={(value) => setSort(value)} />
        </SearchFilter>
      </Searchfilter>
      <SearchReasultProfile>
        {isLoading && (
          <div id="spinner-container">
            <Spinner />
          </div>
        )}
        {data && data.length > 0 ? (
          data.map((el, idx) => (
            <div key={idx}>
              <SeniorProfile data={el} />
            </div>
          ))
        ) : (
          <div>해당하는 선배가 없어요</div>
        )}
      </SearchReasultProfile>
      {searchModal && searchPortalElement
        ? createPortal(
            <SearchModal modalHandler={searchModalHandler} />,
            searchPortalElement,
          )
        : ''}
    </>
  );
}

const SearchReasult = styled.div`
  display: flex;
  width: 100%;
  height: 3rem;
  align-items: center;
`;
const SearchReasultTerm = styled.div`
  margin-left: 1rem;
  font-weight: 500;
`;
const Searchfilter = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #f5f5f5;
  align-items: center;
  padding: 0 1rem;
`;
const SearchFcount = styled.div``;
const SearchFilter = styled.div``;
const SearchReasultOut = styled.div``;
const SearchReasultProfile = styled.div`
  padding: 1rem;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  position: relative;

  #spinner-container {
    width: 3rem;
    height: 3rem;
    margin: 3rem auto;
  }
`;

export default SearchResultPage;
