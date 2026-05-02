import { getToken } from "next-auth/jwt";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError, UTApi } from "uploadthing/server";

const f = createUploadthing();
export const ourFileRouter = {
  imageUpload: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const token = await getToken({ req, secret: process.env.SECRET_KEY });
      if (!token) {
        throw new UploadThingError("User unauthorize!");
      }

      if (token.imageUrl && token.imageUrl !== "") {
        const fileKey = token.imageUrl.split("/");
        if (fileKey.length > 1) {
          const key = fileKey[1];
          const utApi = new UTApi();
          await utApi.deleteFiles(key);
        }
      }

      return {
        userId: token.id,
      };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      const urlImg = file.ufsUrl;
      return {
        userId: metadata.userId,
        urlImg,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
