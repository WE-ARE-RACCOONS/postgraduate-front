import { DescendantContext } from '@/hooks/useDescendant';
import { ReactNode } from 'react';
import { useDropdownContext } from './useDropdown';

export const Dropdown = ({ children }: { children: ReactNode }) => {
  const { dropdownRef, descendants } = useDropdownContext();

  return (
    <DescendantContext.Provider value={descendants}>
      <div ref={dropdownRef}>{children}</div>
    </DescendantContext.Provider>
  );
};
