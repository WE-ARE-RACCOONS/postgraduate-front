'use client';

import { OverlayProvider } from 'overlay-kit';
import { ReactNode } from 'react';
export default function OverlayKitProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <OverlayProvider>{children}</OverlayProvider>;
}
