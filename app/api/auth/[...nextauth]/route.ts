import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { db, sql } from '@vercel/postgres';

const client = await db.connect();
const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        user_or_email: {},
        password: {},
      },
      async authorize(credentials, req) {
        //
        console.log({credentials});
        const response = await client.sql`
        SELECT * FROM users WHERE email=${credentials?.user_or_email} or username=${credentials?.user_or_email}`;
        const user = response.rows[0];

        const passwordCorrect = await compare(
          credentials?.password || '',
          user.password
        );

        console.log({ passwordCorrect });

        if (passwordCorrect) {
          return {
            id: user.id,
            name: user.username,
            email: user.email,
          };
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };