import { TextField } from '@mui/material';
import {
  SearchResult,
  SearchResultWrapper,
  TextFieldWrapper,
} from './SearchForm.styled';
import axios from 'axios';
import React, { useState } from 'react';
import { SearchFormProps } from '@/types/form/searchForm';
import { useSetAtom } from 'jotai';
import { sMajorAtom, sPostGraduAtom } from '@/stores/senior';
import Image from 'next/image';
import search_color from '../../../../public/search2.png';
function SearchForm(props: SearchFormProps) {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState<Array<string> | null>(null);
  const setSPostGradu = useSetAtom(sPostGraduAtom);
  const setSMajor = useSetAtom(sMajorAtom);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setKeyword(e.currentTarget.value);
    if (result) setResult(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      setData();
    }
  };

  const setData = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_CAREERNET_URL}`, {
        params:
          props.formType == 'postgradu'
            ? {
                apiKey: process.env.NEXT_PUBLIC_CAREERNET_API_KEY,
                svcType: 'api',
                svcCode: 'SCHOOL',
                contentType: 'json',
                gubun: 'univ_list',
                sch1: '100323',
                searchSchulNm: keyword,
              }
            : {
                apiKey: process.env.NEXT_PUBLIC_CAREERNET_API_KEY,
                svcType: 'api',
                svcCode: 'MAJOR',
                contentType: 'json',
                gubun: 'univ_list',
                univSe: 'univ',
                searchTitle: keyword,
              },
      })
      .then(async (res) => {
        if (props.formType == 'postgradu') {
          const searchData = res.data.dataSearch.content;
          if (searchData.length > 0) {
            const tempArr = [];
            for (let i = 0; i < searchData.length; i++) {
              tempArr.push(searchData[i].schoolName);
            }
            setResult(tempArr);
          }
          return;
        }

        if (props.formType == 'major') {
          if (res.data.dataSearch.content.length > 0) {
            const dataArr = res.data.dataSearch.content;
            const tempArr = [];
            let pageCnt = Math.floor(Number(dataArr[0].totalCount) / 20);
            if (Number(dataArr[0].length % 20 !== 0)) pageCnt += 1;

            for (let i = 0; i < dataArr.length; i++) {
              if (dataArr[i].mClass.includes(keyword))
                tempArr.push(dataArr[i].mClass);
            }

            if (pageCnt > 1) {
              for (let j = 2; j <= pageCnt; j++) {
                await axios
                  .get(`${process.env.NEXT_PUBLIC_CAREERNET_URL}`, {
                    params: {
                      apiKey: process.env.NEXT_PUBLIC_CAREERNET_API_KEY,
                      svcType: 'api',
                      svcCode: 'MAJOR',
                      contentType: 'json',
                      gubun: 'univ_list',
                      univSe: 'univ',
                      thisPage: j,
                      searchTitle: keyword,
                    },
                  })
                  .then((res) => {
                    const pageArr = res.data.dataSearch.content;
                    for (let k = 0; k < pageArr.length; k++) {
                      if (pageArr[k].mClass.includes(keyword))
                        tempArr.push(pageArr[k].mClass);
                    }
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              }
            }

            setResult(tempArr);
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    props.clickHandler();
    if (props.formType == 'postgradu') {
      setSPostGradu(e.currentTarget.innerText);
      return;
    }

    if (props.formType == 'major') {
      setSMajor(e.currentTarget.innerText);
      return;
    }
  };

  return (
    <>
      <TextFieldWrapper>
        <Image
          src={search_color}
          alt="search"
          width={24}
          height={24}
          style={{ marginRight: '0.75rem' }}
        />
        <TextField
          id="outlined-basic"
          label={props.formType == 'postgradu' ? '대학원명' : '학과'}
          variant="outlined"
          size="small"
          style={{ width: '90%', height: '2.25rem', border: 'none' }}
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => handleKeyDown(e)}
          onBlur={setData}
        />
      </TextFieldWrapper>
      <SearchResultWrapper>
        {result &&
          result.map((el, idx) => (
            <SearchResult
              key={idx}
              onClick={(e) => {
                handleClick(e);
              }}
            >
            {el}
            </SearchResult>
          ))}
      </SearchResultWrapper>
    </>
  );
}

export default SearchForm;
