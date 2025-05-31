import { UserDB } from "@/db/user";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt"
	},
	providers: [
		GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID!,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      })
	],
	callbacks: {
      async signIn({ user, account, profile }) {
         const existingUser = await UserDB.getUser(user.email!);
         if (!existingUser) {
            let userId = crypto.randomUUID();
            await UserDB.insert({
               userid: userId,
               email: user.email!
            });
         }
         return true; // Allow sign in
      },
		jwt: async ({ user, token, trigger, session }) => {
			if (trigger == "update") {
				return {
					...token,
					...session.user
				}
			}
			return { ...token, ...user }
		}
	}
}