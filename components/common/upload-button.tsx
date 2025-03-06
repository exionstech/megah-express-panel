import React, { useCallback, useState } from "react";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, X, File } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { useUploadThing } from "@/utils/upload-helper";

// Define the endpoint type based on your file router
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

  const { startUpload, isUploading: isUploadingState, routeConfig } = useUploadThing(endpoint, {
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
    }
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles[0]) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      
      // Create preview for image files
      if (selectedFile.type.includes("image")) {
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
      } else {
        setPreview(null);
      }
      
      // Start upload
      startUpload([selectedFile]);
    }
  }, [startUpload]);

  // Define acceptable file types
  const acceptableFileTypes = {
    "image/png": [".png"],
    "image/jpeg": [".jpg", ".jpeg"],
    "application/pdf": [".pdf"]
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
          className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
        >
          <input {...getInputProps()} />
          <Upload className="h-10 w-10 text-blue-500 mb-2" />
          <p className="text-sm text-center">
            Drag your file(s) to start uploading
          </p>
          <p className="text-xs text-center text-muted-foreground mt-1">OR</p>
          <Button variant="outline" size="sm" className="mt-2">
            Browse files
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-2">
            Only support .jpg, .png and .pdf and .jpeg files
          </p>
        </div>
      ) : isUploading ? (
        <div className="border rounded-md p-4">
          <div className="flex items-center">
            <span className="text-sm font-medium">Uploading...</span>
            <span className="ml-auto text-xs text-muted-foreground">
              {uploadProgress}% • {Math.round((file.size / 1024) * 10) / 10}KB remaining
            </span>
          </div>
          <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full" 
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <div className="flex justify-end mt-2">
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-6 w-6 rounded-full" 
              onClick={removeFile}
            >
              <X className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-6 w-6 rounded-full ml-1"
              disabled
            >
              <Loader2 className="h-4 w-4 animate-spin" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="border rounded-md p-4">
          <div className="flex items-center">
            <File className="h-5 w-5 text-red-500 mr-2" />
            <span className="text-sm font-medium">{file.name}</span>
            <span className="ml-auto text-xs text-muted-foreground">
              {Math.round((file.size / 1024) * 10) / 10}KB
            </span>
          </div>
          <div className="flex justify-end mt-2">
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-6 w-6 rounded-full" 
              onClick={removeFile}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;