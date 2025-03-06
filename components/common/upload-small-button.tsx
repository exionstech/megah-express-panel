import React, { useCallback, useState } from "react";
import { useDropzone } from "@uploadthing/react";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, X, File } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { useUploadThing } from "@/utils/upload-helper";

type EndpointKey = keyof OurFileRouter;

interface UploaderSmallButtonProps {
  endpoint: EndpointKey;
  onUploadComplete: (url: string) => void;
  className?: string;
}

const UploaderSmallButton = ({
  endpoint,
  onUploadComplete,
  className,
}: UploaderSmallButtonProps) => {
  const [file, setFile] = useState<File | null>(null);
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
    setIsUploaded(false);
    setUploadProgress(0);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {!file ? (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <Button 
            size="sm" 
            className="flex items-center gap-1"
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            Upload a new photo
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2 px-2 py-1 border rounded-md">
          <File className="h-4 w-4 text-brandblue" />
          <span className="text-xs truncate max-w-32">{file.name}</span>
          <Button
            size="icon"
            variant="ghost"
            className="h-5 w-5 rounded-full p-0"
            onClick={removeFile}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default UploaderSmallButton;