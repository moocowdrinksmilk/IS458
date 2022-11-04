import { NextApiRequest, NextApiResponse } from "next"
import NextAuth, { NextAuthAction, NextAuthOptions } from "next-auth"
import CognitoProvider from "next-auth/providers/cognito";
import { suppressDeprecationWarnings } from "moment"

const scopes = ['identify', 'guilds', "guilds.members.read"].join(' ')

export default (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, nextAuthOptions(req, res))
}

const nextAuthOptions = (req: NextApiRequest, res: NextApiResponse): NextAuthOptions => {
  return {
    // Configure one or more authentication providers
    providers: [
      CognitoProvider({
        clientId: process.env.COGNITO_CLIENT_ID as string,
        clientSecret: process.env.COGNITO_CLIENT_SECRET as string,
        issuer: process.env.COGNITO_ISSUER as string,
      }),
    ],
    secret: process.env.NEXT_AUTH_SECRET,
    callbacks: {
      // @ts-ignore
      async signIn({ user, account, profile, email, credentials, referrerId }) {
        // const hasRole = await verifyAccessToken(account.access_token as string)
        // if(!hasRole) {
        //   return '/?holder=false'
        // }

        return true

      },
      async jwt({ token, account }) {
        // Persist the OAuth access_token to the token right after signin
        if (account) {
          token.accessToken = account.access_token
        }

        return token
      },
      async session({ session, token, user }) {
        // Send properties to the client, like an access_token from a provider.
        // session.accessToken = token.accessToken
        // session.userId = token.sub


        return session
      }

    }
  }
}