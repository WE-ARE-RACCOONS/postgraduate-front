import './globals.css';
import type { Metadata } from 'next';
import Providers from '@/components/Provider/providers';
import StyledComponentsRegistry from '@/lib/registry';
import GTMAnalytics from '@/components/GA/GTM';

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
        <GTMAnalytics />
        <Providers>
          <StyledComponentsRegistry>
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
            <div id="junior-request-portal"></div>
            <div id="profile-modify-portal"></div>
            <div id="senior-mentoring-detail"></div>
            <div id="senior-mentoring-cancel"></div>
            <div id="senior-mentoring-accept"></div>
            <div id="senior-info-modify-portal"></div>
            <div id="senior-mentoring-time-portal"></div>
            <div id="senior-profile-not-registered"></div>
            <div id="select-date-calendar"></div>
            <div id="suggest-mypage-portal"></div>
            <div id="senior-auth-portal"></div>
            <div id="mentoring-login-portal"></div>
            <div id="change-junior-portal"></div>
            <div id=" mentoring-cancel-success"></div>
            <div id="pay-amount-portal"></div>
          </StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  );
}
