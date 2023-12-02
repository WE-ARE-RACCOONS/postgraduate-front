import React from 'react'
import {SearchModalBgBox,
    SearchModalInput,
} from './SearchModal.styled'
import { SearchModalProps } from '@/types/modal/search'
export default function SearchModal(props : SearchModalProps) {
  return (
   <SearchModalBgBox>
    <SearchModalInput>

    </SearchModalInput>
   </SearchModalBgBox>
  )
}
