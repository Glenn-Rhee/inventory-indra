import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string | null;
      username?: string | null;
      imageUrl?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string | undefined;
    username?: string | undefined;
    imageUrl?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string | undefined;
    username?: string | undefined;
    imageUrl?: string | undefined | null;
  }
}
