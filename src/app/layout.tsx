import './globals.css';
import type { Metadata } from 'next';
import Providers from '@/components/Provider/providers';
import Token from '@/components/Common/Token';

export const metadata: Metadata = {
  title: '김선배',
  description: '후배 멘티와 대학원생 멘토를 매칭하는 서비스!',
  icons: {
    icon: '/favicon.ico',
  },
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
          <div id="senior-my-profile-portal"></div>
          <div id="senior-request-portal"></div>
          <div id="profile-modify-portal"></div>
          <div id="senior-mentoring-detail"></div>
          <div id="senior-mentoring-cancel"></div>
          <div id="senior-mentoring-accept"></div>
          <div id='senior-info-modify-portal'></div>
        </Providers>
      </body>
    </html>
  );
}
