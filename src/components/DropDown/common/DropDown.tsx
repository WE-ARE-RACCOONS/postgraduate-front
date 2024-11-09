import { PropsWithChildren } from 'react';
import { DescendantContext } from '@/hooks/useDescendant';
import { useDropdown } from './useDropdown';
import type { DropDownMenuProp } from './useDropdown';

export const Dropdown = (props: PropsWithChildren<DropDownMenuProp> = {}) => {
  const { descendants } = useDropdown(props);

  return (
    <DescendantContext.Provider value={descendants}>
      {props.children}
    </DescendantContext.Provider>
  );
};
