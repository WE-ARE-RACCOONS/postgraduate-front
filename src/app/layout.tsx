import './globals.css';
import type { Metadata } from 'next';
import Providers from '@/components/Provider/providers';
import StyledComponentsRegistry from '@/lib/registry';
import GTMAnalytics from '@/components/GA/GTM';
import GoogleAnalytics from '@/components/GA/GA';
import { SERVICE_METADATA } from '@/constants/meta/metaData';
import OverlayKitProvider from '@/lib/overlay';
import localFont from 'next/font/local';
export const metadata: Metadata = {
  title: SERVICE_METADATA.title,
  description: SERVICE_METADATA.description,
  icons: {
    icon: '/favicon.ico',
  },
  keywords: SERVICE_METADATA.keywords,
};

const Pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'bold',
    },
    {
      path: '../../public/fonts/Pretendard-ExtraLight.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={Pretendard.className}>
        {process.env.NEXT_PUBLIC_GTM_ID ? <GTMAnalytics /> : <></>}
        {process.env.NEXT_PUBLIC_GA4_ID ? <GoogleAnalytics /> : <></>}
        <Providers>
          <StyledComponentsRegistry>
            <OverlayKitProvider>
              {children}
              <div id="junior-mentoring-cancel"></div>
              <div id="senior-request-portal"></div>
              <div id="senior-mentoring-cancel"></div>
              <div id="suggest-mypage-portal"></div>
              <div id="senior-auth-portal"></div>
              <div id=" mentoring-cancel-success"></div>
            </OverlayKitProvider>
          </StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  );
}
