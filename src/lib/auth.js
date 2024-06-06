import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./utils";
import { User } from "./models";
import { authConfig } from "./auth.config";
import bcrypt from "bcryptjs";

// Login function to authenticate users with credentials
const login = async (credentials) => {
  try {
    connectToDb();
    const user = await User.findOne({ username: credentials.username });   // Find a user with the provided username
    if (!user) throw new Error("Wrong credentials!");

    const isPasswordCorrect = await bcrypt.compare(       // Compare the provided password with the hashed password in the database
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) throw new Error("Wrong credentials!");

    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
};

// Configure NextAuth with the specified providers and callbacks

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
  ...authConfig,  // Spread the authConfig object

 // GitHub provider configuration
  providers:
    [GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
     // Credentials provider configuration
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
    ],
     // Callback function executed after a successful sign-in
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "github") {
        connectToDb();
        try {
          const user = await User.findOne({ email: profile.email });
          if (!user) {
            const newUser = new User({
              username: profile.login,
              email: profile.email,
              image: profile.avatar_url,
            });

            await newUser.save();
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      return true;
    },
    ...authConfig.callbacks,


  }
});