import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import EmailProvider from "next-auth/providers/email";

import { env } from "@/env";
import { db } from "@/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  export interface Session extends Omit<DefaultSession, "user"> {
    user: {
      id: number;
      name: string; 
      email: string; 
      tag: string; 
      isSubscribed: boolean; 
      isNotification: boolean;
    };
  }

  export interface User {
    id: number;
    name: string;
    email: string;
    tag: string;
    isSubscribed: boolean;
    isNotification: boolean;
    country_abbrev: string;
    bio: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "database",
  },
  callbacks: {
    async session({ session, user }) {
      return {
        ...session,
        user: {
          id: user.id,
          name: user.name, 
          email: user.email, 
          tag: user.tag,
          isSubscribed: user.isSubscribed,
          isNotification: user.isNotification,
          country_abbrev: user.country_abbrev,
          bio: user.bio,
        },
      };
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
