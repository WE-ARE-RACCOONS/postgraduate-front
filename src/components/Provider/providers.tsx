'use client';

import { Provider } from 'jotai';
import { OverlayProvider } from 'overlay-kit';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <OverlayProvider>{children}</OverlayProvider>
    </Provider>
  );
}
