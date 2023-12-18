import { SearchDropDownProps } from '@/types/dropDown/SearchDropDown';
import React from 'react';

function SearchDropDown({ onChange }: SearchDropDownProps) {
  const handleSortChange = (e: React.ChangeEvent<any>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <select onChange={handleSortChange}>
        <option value="high">조회수 높은순</option>
        <option value="low">조회수 낮은순</option>
      </select>
    </div>
  );
}

export default SearchDropDown;
