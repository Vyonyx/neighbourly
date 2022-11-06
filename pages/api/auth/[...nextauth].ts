import NextAuth from "next-auth/next";
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from "../../../utils/mongodb";

import GithubProvider from 'next-auth/providers/github'

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    })
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  adapter: MongoDBAdapter(clientPromise),
}

export default NextAuth(authOptions)