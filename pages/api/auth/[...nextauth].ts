import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    // ...add more providers here
    {
        id: "todoist",
        name: "Todoist",
        type: "oauth",
        version: "2.0",
        scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
        params: { grant_type: "authorization_code" },
        accessTokenUrl: "https://accounts.google.com/o/oauth2/token",
        requestTokenUrl: "https://accounts.google.com/o/oauth2/auth",
        authorizationUrl: "https://accounts.google.com/o/oauth2/auth?response_type=code",
        profileUrl: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
        async profile(profile, tokens): Promise<any> {
          // You can use the tokens, in case you want to fetch more profile information
          // For example several OAuth providers do not return email by default.
          // Depending on your provider, will have tokens like `access_token`, `id_token` and or `refresh_token`
          return {
            id: profile.id,
            name: profile.name,
            email: profile.email,
            image: profile.picture
          }
        },
        clientId: "",
        clientSecret: ""
      }
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
})