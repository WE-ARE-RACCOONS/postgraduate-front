import { Dropdown } from '@/components/DropDown/common';
import styled from 'styled-components';

interface TapStyleProps {
  selected: boolean;
}
export const TapStyle = styled.div<TapStyleProps>`
  border: 1px solid ${({ selected }) => (selected ? '#98999A' : '#DEE2E4')}; /* border 속성 통합 */
  height: 28px;
  min-width: 70px;
  border-radius: 5.22px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-right: 0.3rem;
  font-weight: 700;
  font-size: 0.87rem;
  box-shadow: 0px 0px 4px 0px rgba(73, 85, 101, 0.2);
  background-color: ${({ selected }) => (selected ? '#F1F3F3' : 'transparent')};
  color: ${({ selected }) => (selected ? '#4C4D4E' : '#DEE2E6')};
  cursor: pointer;
`;

export const TabBackdrop = styled.div`
  position: absolute;
  top: 225px;
  width: 360px;
  min-height: 1800px;
  overflow-y: hidden;
  background-color: rgba(0, 0, 0, 0.4);
  margin: 0 auto;
`;

export const TabHeader = styled.h1`
  padding: 1rem;
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 4px;
  background: white;
`;

export const TabTrigger = styled(Dropdown.Trigger)`
  position: absolute;
  right: 1rem;
  top: 1rem;
  display: flex;
  align-items: center;
`;
