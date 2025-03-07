import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/core";

export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();