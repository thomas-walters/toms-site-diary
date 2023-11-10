import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
  
export const ourFileRouter = {
  diaryImageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 4 } })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("file url", file.url); 
      // Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;
