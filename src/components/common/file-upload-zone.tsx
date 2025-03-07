import React, { useCallback, useState } from "react";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Button } from "@/components/ui/button";
import { X, File, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { useUploadThing } from "@/utils/upload-helper";
import CustomIcon from "../shared/custom-icon";

type EndpointKey = keyof OurFileRouter;

interface ImageUploaderProps {
  endpoint: EndpointKey;
  onUploadComplete: (url: string) => void;
  title?: string;
  fileType?: string;
  className?: string;
}

const ImageUploader = ({
  endpoint,
  onUploadComplete,
  title = "Upload Image",
  fileType = "image",
  className,
}: ImageUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);

  const {
    startUpload,
    isUploading: isUploadingState,
    routeConfig,
  } = useUploadThing(endpoint, {
    onClientUploadComplete: (res) => {
      if (res && res[0]) {
        onUploadComplete(res[0].url);
        setIsUploaded(true);
        setIsUploading(false);
      }
    },
    onUploadError: (error) => {
      console.error("Error uploading:", error);
      setIsUploading(false);
      setUploadProgress(0);
    },
    onUploadBegin: () => {
      setIsUploading(true);
    },
    onUploadProgress: (progress) => {
      setUploadProgress(progress as number);
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles[0]) {
        const selectedFile = acceptedFiles[0];
        setFile(selectedFile);
        if (selectedFile.type.includes("image")) {
          const objectUrl = URL.createObjectURL(selectedFile);
          setPreview(objectUrl);
        } else {
          setPreview(null);
        }
        startUpload([selectedFile]);
      }
    },
    [startUpload]
  );
  const acceptableFileTypes = {
    "image/png": [".png"],
    "image/jpeg": [".jpg", ".jpeg"],
    "application/pdf": [".pdf"],
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptableFileTypes,
    maxFiles: 1,
  });

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    setIsUploaded(false);
    setUploadProgress(0);
  };

  return (
    <div className={cn("w-full", className)}>
      {!file ? (
        <div
          {...getRootProps()}
          className="border-[2px] border-dashed border-brandblue dark:border-white rounded-md p-6 flex flex-col gap-2 items-center justify-center cursor-pointer transition-colors"
        >
          <input {...getInputProps()} />
          <CustomIcon src={"uploader.svg"} size={40} />
          <p className="text-sm text-center">
            Drag your file(s) to start uploading
          </p>
          <p className="text-xs text-center text-muted-foreground mt-1">OR</p>
          <Button
          type="button"
            variant="outline"
            size="sm"
            className="mt-2 text-brandblue border-brandblue dark:text-white dark:border-white border-[2px] font-semibold hover:text-brandblue"
          >
            Browse files
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-2">
            Only support .jpg, .png and .pdf and .jpeg files
          </p>
        </div>
      ) : isUploading ? (
        <div className="border rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold">Uploading...</span>
              <span className="ml-auto text-xs text-muted-foreground">
                {uploadProgress}% • {Math.round((file.size / 1024) * 10) / 10}KB
                remaining
              </span>
            </div>
            <div className="flex gap-2">
              <Button
              type="button"
                size="icon"
                variant="ghost"
                className="h-6 w-6 rounded-full border-[2px] border-brandred bg-brandred/10"
                onClick={removeFile}
              >
                <X className="h-4 w-4" color="red" />
              </Button>
              <Button
              type="button"
                size="icon"
                variant="ghost"
                className="h-6 w-6 rounded-full border-[2px] border-brandblack bg-brandblack/10"
                disabled
              >
                <Pause className="h-4 w-4" color="#353535" />
              </Button>
            </div>
          </div>
          <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="border rounded-xl p-4 flex justify-between items-center">
          <div className="flex gap-2">
            <File className="h-8 w-8 text-brandred" />
            <div className="flex flex-col gap-[2px]">
              <span className="text-sm font-semibold">{file.name}</span>
              <span className="text-xs text-muted-foreground">
                {Math.round((file.size / 1024) * 10) / 10}KB
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <Button
            type="button"
              size="icon"
              variant="ghost"
              className="h-6 w-6 rounded-full border-[2px] border-brandred bg-brandred/10"
              onClick={removeFile}
            >
              <X className="h-4 w-4" color="red"/>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
