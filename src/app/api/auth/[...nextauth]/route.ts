import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DataUserResponse, ResponsePayload, DataUser } from "@/types";
import ResponseError from "@/error/ResponseError";

interface DataOauth {
  username: string;
  password: string;
}

export const authOptions: AuthOptions = {
  adapter: {
    createUser: async (data: DataOauth) => {
      try {
        const res = await fetch(process.env.BASE_URL + "/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const dataRes = (await res.json()) as ResponsePayload;
        if (dataRes.status === "failed") {
          throw new ResponseError(res.status, dataRes.message);
        }

        return dataRes.data;
      } catch (error) {
        console.log("Error while create data user:", error);
      }
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "janedoe123",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials): Promise<DataUser | null> {
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        try {
          const res = await fetch(process.env.BASE_URL + "/check-user", {
            method: "POST",
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const dataRes: ResponsePayload<DataUserResponse> = await res.json();
          if (dataRes.status === "failed") {
            throw new ResponseError(res.status, dataRes.message);
          }

          const { Id, ImageUrl, Username } = dataRes.data;

          return {
            id: Id,
            imageUrl: ImageUrl,
            username: Username,
          };
        } catch (error) {
          if (error instanceof ResponseError) {
            throw new Error(error.message);
          }

          throw new Error("An error occured!");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          id: user.id,
          imageUrl: user.imageUrl,
          username: user.username,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        username: token.username,
        imageUrl: token.imageUrl,
      };
      return session;
    },
  },
  session: { strategy: "jwt" },
  pages: { signIn: "/" },
  secret: process.env.SECRET_KEY,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
