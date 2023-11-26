import { TextField } from "@mui/material";
import { SearchResult, SearchResultWrapper, TextFieldWrapper } from "./SearchForm.styled";
import axios from "axios";
import React, { useState } from "react";
import { SearchFormProps } from "@/types/form/searchForm";
import { useSetAtom } from "jotai";
import { sPostGraduAtom } from "@/stores/senior";

function SearchForm(props: SearchFormProps) {
  const [school, setSchool] = useState('');
  const [result, setResult] = useState<Array<string> | null>(null);
  const setSPostGradu = useSetAtom(sPostGraduAtom);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSchool(e.currentTarget.value);
    if(result) setResult(null);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if(e.key === 'Enter') {
      axios.get(`${process.env.NEXT_PUBLIC_CAREERNET_URL}`, {
        params: {
          apiKey: process.env.NEXT_PUBLIC_CAREERNET_API_KEY,
          svcType: 'api',
          svcCode: 'SCHOOL',
          contentType: 'json',
          gubun: 'univ_list',
          sch1: '100323',
          searchSchulNm: school
        }
      })
        .then((res) => {
          const schoolData = res.data.dataSearch.content;
          if(schoolData.length > 0) {
            const tempArr = [];
            for(let i = 0; i < schoolData.length; i++) {
              tempArr.push(schoolData[i].schoolName);
            }
            setResult(tempArr);
          }
        }).catch((err) => {
          console.error(err);
        })
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    props.clickHandler();
    setSPostGradu(e.currentTarget.innerText);
  }

  return (
    <>
      <TextFieldWrapper>
        <TextField 
          id="outlined-basic" 
          label="대학원명" 
          variant="outlined" 
          size="small" 
          style={{width: '18.5rem'}}
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => handleKeyDown(e)} />
      </TextFieldWrapper>
      <SearchResultWrapper>
        {result && 
          result.map((el, idx) => (
            <SearchResult key={idx} onClick={(e) => {handleClick(e)}} >{el}</SearchResult>
          ))
        }
      </SearchResultWrapper>
    </>
  )
}

export default SearchForm;