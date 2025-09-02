  import NextAuth from "next-auth";
  import GitHub from "next-auth/providers/github";

  export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [GitHub({
      clientSecret:process.env.AUTH_GITHUB_SECRET,
      clientId:process.env.AUTH_GITHUB_ID,
      authorization: { params: { scope: "read:user repo" } }
    })],

    callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token; // store GitHub token
      }
      return token;
    },
    async session({ session, token }) {
      session.sessionToken = token.accessToken as string;
      return session;
    },
  },
  })