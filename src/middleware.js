import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";

// Export the auth object from NextAuth with the provided authConfig
export default NextAuth(authConfig).auth;

// Configure the middleware to apply to all routes except certain paths
export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};

