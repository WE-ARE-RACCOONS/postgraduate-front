import NextAuth, { NextAuthOptions } from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import { kakaoAuthPostFetch } from '@/api/auth/kakaoAuthPostFetch';
import { redirect } from 'next/navigation';

export const authOptions: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        try {
          const {
            data: { code, data },
          } = await kakaoAuthPostFetch({
            accessToken: account.access_token as string,
          });

          if (code === 'AU204') {
            const {
              accessToken,
              accessExpiration,
              refreshToken,
              refreshExpiration,
              role,
            } = data;

            token.accessToken = accessToken;
            token.accessExpiration = accessExpiration;
            token.refreshToken = refreshToken;
            token.refreshExpiration = refreshExpiration;
            token.role = role;
          }
        } catch (error) {
          console.error(error);

          redirect('/'); //TODO: 무한 루프 돌면 말씀주세요..
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.accessExpiration = token.accessExpiration;
      session.refreshExpiration = token.refreshExpiration;
      session.role = token.role;

      return session;
    },
  },

  session: {
    strategy: 'jwt',
  },

  jwt: {
    secret: process.env.AUTH_SECRET,
  },

  secret: process.env.AUTH_SECRET,

  pages: {
    signIn: '/',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
