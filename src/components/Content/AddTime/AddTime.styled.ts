import styled from "styled-components";

export const AddTimeContainer = styled.div`
  width: inherit;
  height: 100%;
  position: relative;
  overflow-y: scroll;

  #x-icon {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
`

export const AddTimeWeekBox = styled.div`
  width: 85%;
  height: 7.5rem;
  position: absolute;
  top: 5.375rem;
  left: 50%;
  transform: translateX(-50%);
`

export const AddTimeWeekBtn = styled.button`
  width: 3.4rem;
  height: 2.2rem;
  margin-right: 1rem;
`

export const AddTimeAbleBox = styled.div`
  width: 85%;
  height: 7.25rem;
  position: absolute;
  top: 16.375rem;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid #000;
`

export const AddTimeAbleBottom = styled.div`
  width: 85%;
  height: 3.875rem;
  display: flex;
`

export const AddTimeDropdownBox = styled.div`
  width: 9.6rem;
  height: 3.875rem;
`

export const AddTimeDropdownSet = styled.div`
  width: 9rem;
  height: 2.125rem;
  display: flex;
`

export const AddTimeDropdown = styled.select`
  width: 3.375rem;
  height: 2.125rem;
`