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
import Spinner from '@/components/comon/Spinner';
function SearchForm(props: SearchFormProps) {
  const kaistStrArr = ['카이스트', 'KAIST'];
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState<Array<string> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const setSPostGradu = useSetAtom(sPostGraduAtom);
  const setSMajor = useSetAtom(sMajorAtom);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setKeyword(e.currentTarget.value);
    if (result) {
      setResult(null);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      setData();
    }
  };

  const setData = () => {
    setResult(null);
    setIsLoading(true);

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
          const tempArr = [];
          kaistStrArr.forEach((el) => {
            if (el.includes(keyword)) tempArr.push('카이스트');
          });

          if (searchData.length > 0) {
            for (let i = 0; i < searchData.length; i++) {
              tempArr.push(searchData[i].schoolName);
            }
          }
          setResult([...new Set(tempArr)]);
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
            setResult([...new Set(tempArr)]);
          }
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    props.clickHandler();

    if (props.formType == 'postgradu') {
      if (e.currentTarget.innerText == '한국과학기술원')
        setSPostGradu('카이스트');
      else setSPostGradu(e.currentTarget.innerText);
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
          onClick={() => {
            setData();
          }}
        />
        <TextField
          id="outlined-basic"
          label={
            props.formType == 'postgradu'
              ? '대학원명을 검색해주세요'
              : '학과를 검색해주세요'
          }
          variant="outlined"
          size="small"
          style={{ width: '90%', height: '2.25rem', border: 'none' }}
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
      </TextFieldWrapper>
      <SearchResultWrapper>
        {!result && isLoading && (
          <div id="spinner-container">
            <Spinner />
          </div>
        )}
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
