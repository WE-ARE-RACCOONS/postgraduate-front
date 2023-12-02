import React from 'react'
import {HomeSearchFormBox,
    HomeSearchFormInput} from './HomeSearchForm.styled'
function HomeSearchForm() {
  return (
    <HomeSearchFormBox>
      <HomeSearchFormInput
        type="text"
        placeholder="대학원, 연구실명, 연구분야로 검색하기"
      />
    </HomeSearchFormBox>
  )
}

export default HomeSearchForm
