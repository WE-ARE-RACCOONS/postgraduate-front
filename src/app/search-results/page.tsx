'use client';
import React,{useEffect}from 'react'
import { useSearchParams } from 'next/navigation'

function SearchResultPage() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('searchTerm')
  return (
    <div>
      {searchTerm}
    </div>
  )
}

export default SearchResultPage
