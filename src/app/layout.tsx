import './globals.css';
import type { Metadata } from 'next';
import Providers from '@/components/Provider/providers';
import Token from '@/components/Common/Token';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          {/* <Token /> */}
          {children}
          <div id="senior-info-portal"></div>
          <div id="junior-mentoring-detail"></div>
          <div id="junior-mentoring-cancel"></div>
          <div id="senior-profile-portal"></div>
          <div id="login-request-portal"></div>
          <div id="senior-best-case-portal"></div>
          <div id="login-request-full-portal"></div>
          <div id="search-portal"></div>
          <div id='senior-my-profile-portal'></div>
        </Providers>
      </body>
    </html>
  );
}
