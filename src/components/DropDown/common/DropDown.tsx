import { ReactNode } from 'react';

export const Dropdown = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      {children}
    </div>
  );
};
