import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      clientId: process.env.AUTH_GITHUB_ID,
      authorization: { params: { scope: "read:user repo" } },
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (profile) {
        token.login = (profile as any).login;
      }

      return token;
    },

    async session({ session, token }) {
      (session as any).sessionToken = token.accessToken;

      (session.user as any).login = token.login;

      return session;
    },
  },
});
