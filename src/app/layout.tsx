import './globals.css';
import type { Metadata } from 'next';
import Providers from '@/components/Provider/providers';
import StyledComponentsRegistry from '@/lib/registry';

import { SERVICE_METADATA } from '@/constants/meta/metaData';
import OverlayKitProvider from '@/lib/overlay';
import GA from '@/components/common/GA/GA';
import GTM from '@/components/common/GA/GTM';
import { ToastProvider } from '@/components/common/Toast/ToastProvider';

export const metadata: Metadata = {
  title: SERVICE_METADATA.title,
  description: SERVICE_METADATA.description,
  icons: {
    icon: '/favicon.ico',
  },
  metadataBase: new URL('https://www.kimseonbae.com'),
  alternates: {
    canonical: '/',
    languages: {
      ko: '/',
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    title: '대학원 김선배',
    description:
      '예비 대학원생과 실제 랩실에 있는 대학원생을 매칭해주는 대학원 김선배입니다.',
    images: [
      {
        url: `/og.png`,
        width: 800,
        height: 600,
      },
    ],
  },
  keywords: SERVICE_METADATA.keywords,
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '대학원 김선배',
    description:
      '예비 대학원생과 실제 랩실에 있는 대학원생을 매칭해주는 서비스',
    url: 'https://www.kimseonbae.com',
    logo: 'https://www.kimseonbae.com/og.png',
  };

  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {process.env.NEXT_PUBLIC_GTM_ID ? <GTM /> : <></>}
        {process.env.NEXT_PUBLIC_GA4_ID ? <GA /> : <></>}
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
            <ToastProvider />
          </StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  );
}
