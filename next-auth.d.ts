import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    sessionToken?: string;
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      login?: string;
    };
  }

  interface JWT {
    sessionToken?: string;
    login?: string;
  }
}
