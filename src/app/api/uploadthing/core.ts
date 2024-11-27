import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import {images} from "~/server/db/schema";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    imageUploader: f({
        image: {
            /**
             * For full list of options and defaults, see the File Route API reference
             * @see https://docs.uploadthing.com/file-routes#route-config
             */
            maxFileSize: "4MB",
            maxFileCount: 40,
        },
    })
        // Set permissions and file types for this FileRoute
        .middleware(async ({ req }) => {
            // This code runs on your server before upload
            const user = await auth();

            // If you throw, the user will not be able to upload
            // eslint-disable-next-line @typescript-eslint/only-throw-error
            if (!user.userId) throw new UploadThingError("Unauthorized");

            // Whatever is returned here is accessible in onUploadComplete as `metadata`
            return { userId: user.userId };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // This code RUNS ON YOUR SERVER after upload
            console.log("Upload complete for userId:", metadata.userId);
            await db.insert(images).values({
                userId: metadata.userId,
                name: file.name,
                url: file.url,
            });

            return {uploadedBy: metadata.userId};

            console.log("file url", file.url);

            // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
            return { uploadedBy: metadata.userId };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;