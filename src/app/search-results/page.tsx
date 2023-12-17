'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import SeniorProfile from '@/components/SeniorProfile/SeniorProfile';
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import SearchDropDown from '@/components/dropDown/searchDropDown/searchDropDown';
function SearchResultPage() {
  const router = useRouter();
  const { getAccessToken } = useAuth();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('searchTerm');
  const [sort, setSort] = useState('');
  const [data, setData] = useState([]);
  const [length, setLength] = useState('');
  useEffect(() => {
    const Token = getAccessToken();
    const headers = {
      Authorization: `Bearer ${Token}`,
    };

    if (searchTerm) {
      let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/senior/search?find=${searchTerm}`;
      if (sort) {
        url += `&sort=${sort}`;
      }

      axios
        .get(url, { headers })
        .then((res) => {
          setData(res.data.data.seniorSearchResponses);
          setLength(res.data.data.seniorSearchResponses.length);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [searchTerm]);

  const pageBack = () => {
    router.back();
  };

  return (
    <>
      <SearchReasult>
        <SearchReasultOut onClick={pageBack}>&gt;</SearchReasultOut>

        <SearchReasultTerm>{searchTerm}</SearchReasultTerm>
      </SearchReasult>
      <Searchfilter>
        <SearchFcount>총 {length}건</SearchFcount>
        <SearchFilter>
          <SearchDropDown onChange={(value) => setSort(value)} />
        </SearchFilter>
      </Searchfilter>
      <SearchReasultProfile>
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
    </>
  );
}

const SearchReasult = styled.div`
  display: flex;
  width: 100%;
  height: 3rem;
  border: 1px solid blue;
`;
const SearchReasultTerm = styled.div`
  margin-left: 1rem;
`;
const Searchfilter = styled.div`
  width: 100%;
  height: 3rem;
  border: 1px solid blue;
  display: flex;
  justify-content: space-between;
`;
const SearchFcount = styled.div``;
const SearchFilter = styled.div``;
const SearchReasultOut = styled.div``;
const SearchReasultProfile = styled.div`
  border: 1px solid red;
  width: 100%;
  height: 100%;
`;

export default SearchResultPage;
