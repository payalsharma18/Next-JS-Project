export const authConfig = {
    pages: {
      signIn: "/login",
    },
    providers: [],
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.isAdmin = user.isAdmin;
        }
        return token;
      },
      async session({ session, token }) {
        if (token) {
          session.user.id = token.id;
          session.user.isAdmin = token.isAdmin;
        }
        return session;
      },
      authorized({ auth, request }) {
        const user = auth?.user;
        const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");//if user is on admin panel
        const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog");// if the user is on the blog page
        const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");  // if the user is on login page
  
        // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD
  
        if (isOnAdminPanel && !user?.isAdmin) {    // if user is not admin and on the admin page return false and rediect itto login page
          return false;  
        }
  
        // ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE
  
        if (isOnBlogPage && !user) {  // if the user is on the blog page if there is no user we will return false and rediect to login page
          return false;
        }
  
        // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE
  
        if (isOnLoginPage && user) {
          return Response.redirect(new URL("/", request.nextUrl));  // if the user is on the login page amd th euser exists then the user will not e ablw=e to see the login page
        }
  
        return true
      },
    },
  };
  