import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = nextUrl.pathname.startsWith("/admin");
      
      if (isAdminRoute) {
        if (isLoggedIn) {
          const role = (auth.user as any)?.role;
          if (role === "ADMIN" || role === "SUB_ADMIN") {
            return true;
          }
          // Redirect standard logged-in users to home
          return Response.redirect(new URL("/", nextUrl));
        }
        return false; // Redirect unauthenticated users to login page
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      // Support manual session updates in admin panel
      if (trigger === "update" && session) {
        token.role = session.role ?? token.role;
        token.name = session.name ?? token.name;
        token.email = session.email ?? token.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id as string;
      }
      return session;
    }
  },
  providers: [], // Configured inside auth.ts
} satisfies NextAuthConfig;
