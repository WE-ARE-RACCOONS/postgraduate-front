import './globals.css';
import type { Metadata } from 'next';
import Providers from '@/components/Provider/providers';
import StyledComponentsRegistry from '@/lib/registry';
import GTMAnalytics from '@/components/GA/GTM';
import GoogleAnalytics from '@/components/GA/GA';
import { SERVICE_METADATA } from '@/constants/meta/metaData';
import OverlayKitProvider from '@/lib/overlay';
export const metadata: Metadata = {
  title: SERVICE_METADATA.title,
  description: SERVICE_METADATA.description,
  icons: {
    icon: '/favicon.ico',
  },
  keywords: SERVICE_METADATA.keywords,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {process.env.NEXT_PUBLIC_GTM_ID ? <GTMAnalytics /> : <></>}
        {process.env.NEXT_PUBLIC_GA4_ID ? <GoogleAnalytics /> : <></>}
        <Providers>
          <StyledComponentsRegistry>
            <OverlayKitProvider>
              {children}
              <div id="junior-mentoring-cancel"></div>
              <div id="senior-profile-portal"></div>
              <div id="login-request-full-portal"></div>
              <div id="senior-request-portal"></div>
              <div id="junior-request-portal"></div>
              <div id="profile-modify-portal"></div>
              <div id="senior-mentoring-cancel"></div>
              <div id="senior-profile-not-registered"></div>
              <div id="suggest-mypage-portal"></div>
              <div id="senior-auth-portal"></div>
              <div id="mentoring-login-portal"></div>
              <div id="change-junior-portal"></div>
              <div id=" mentoring-cancel-success"></div>
              <div id="pay-amount-portal"></div>
            </OverlayKitProvider>
          </StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  );
}
