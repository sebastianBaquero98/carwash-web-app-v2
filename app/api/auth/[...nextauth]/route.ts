import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

export const authOptions: any = {
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID!,
      clientSecret: process.env.COGNITO_CLIENT_SECRET!,
      issuer: process.env.COGNITO_ISSUER!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    // Choose a strategy for handling sessions (default, jwt, or database)
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // Session max age in seconds (30 days)
  },
  callbacks: {
    async jwt({
      token,
      user,
      session,
      account,
      profile,
      isNewUser,
      trigger,
    }: any) {
      if (trigger === "update") {
        const hasBaysKey = "hasBays" in session;
        if (session?.locationId) {
          token.locationId = session.locationId;
        }
        if (session?.locationName) {
          token.locationName = session.locationName;
        }
        if (session || hasBaysKey) {
          token.hasBays = session.hasBays;
        }
      }
      if (account) {
        token.accessToken = account.access_token;
        token.id_token = account.id_token;
      }
      // console.log("this is account, ", account);
      return token;
    },
    async session({ session, token, user, trigger }: any) {
      // session.user.id = token.sub;
      // if (trigger === "update" && session?.locationId) {
      // }
      const parsedToken = JSON.parse(
        Buffer.from(token.accessToken.split(".")[1], "base64").toString()
      );
      // console.log("this is parsedToken", parsedToken);

      session.accessToken = token.accessToken;
      session.tenantId = parsedToken["cognito:groups"][0];
      session.userName = parsedToken.username;
      session.locationId = token.locationId;
      session.locationName = token.locationName;
      session.hasBays = token.hasBays;
      session.id_token = token.id_token;
      return session;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
