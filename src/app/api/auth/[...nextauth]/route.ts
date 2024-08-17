import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth, { NextAuthOptions } from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';

//TODO: 카카오 로그인 연결 필요, 콘솔제거 필요
export const authOptions: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      console.log({
        clientId: process.env.KAKAO_CLIENT_ID as string,
        clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
      });
      console.log('token -> ', token);
      console.log('user => ', user);
      console.log('account => ', account);
      if (user) {
      }

      return { token, user, account };
    },

    async session({ session, token }) {
      console.log('session =>', session);

      console.log('session token =>', token);
      return session;
    },
  },

  session: {
    strategy: 'jwt',
  },

  secret: process.env.AUTH_SECRET,

  pages: {
    signIn: '/',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
