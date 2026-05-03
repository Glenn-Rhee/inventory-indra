"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Dropzone, { FileRejection } from "react-dropzone";
import { CloudDownload } from "lucide-react";
import { Progress } from "./ui/progress";
import { toast } from "sonner";

interface UploadImageProps {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  isUploading: boolean;
  uploadProgress: number
}

export default function UploadImage(props: UploadImageProps) {
  const { files, setFiles, isUploading, uploadProgress } = props;
  const [isDragOver, setIsDragover] = useState(false);
  const handleDropAccepted = async (accFiles: File[]) => {
    if (accFiles.length > 1) {
      toast.error("Oops maximum upload file only 1");
      return;
    }
    setIsDragover(false);
    setFiles(accFiles);
  };

  const handleDropRejected = (rejectFiles: FileRejection[]) => {
    const [file] = rejectFiles;
    if (file.errors.some((err) => err.code.includes("type"))) {
      toast.error("Please choose a PNG, JPG, and JPEG image instead.");
    } else if (file.errors.some((err) => err.code.includes("large"))) {
      toast.error("Please choose a file less than 4MB");
    } else {
      toast.error("Something went wrong, please try again later.");
    }
  };

  return (
    <div className="w-full p-2 col-span-2">
      <Label className="font-medium text-sm text-muted-foreground">
        Upload Your Image
      </Label>
      <Dropzone
        accept={{
          "image/png": [".png"],
          "image/jpeg": [".jpeg"],
          "image/jpg": [".jpg"],
        }}
        maxSize={1024 * 1024 * 4}
        maxFiles={1}
        onDropAccepted={handleDropAccepted}
        onDropRejected={handleDropRejected}
        onDragEnter={() => setIsDragover(true)}
        onDragLeave={() => setIsDragover(false)}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className="w-full rounded-lg cursor-pointer flex flex-col justify-center items-center border-dotted border border-gray-500 h-32 mt-3"
          >
            <Input {...getInputProps()} />
            {isDragOver && (
              <CloudDownload className="size-5 text-muted-foreground" />
            )}

            <div className="flex flex-col justify-center mb-2 text-sm text-muted-foreground">
              {isUploading ? (
                <div className="flex flex-col items-center">
                  <p>Uploading...</p>
                  <Progress
                    value={uploadProgress}
                    className="mt-2 w-40 bg-gray-300"
                  />
                </div>
              ) : isDragOver ? (
                <p>
                  <span className="font-semibold">Drop File</span> to Upload
                </p>
              ) : files.length > 0 ? (
                <p className="font-medium text-muted-foreground">
                  {files[0].name}
                </p>
              ) : (
                <p>
                  <span className="font-semibold">Click to upload </span>
                  or Drag and Drop
                </p>
              )}
            </div>
            <p className="text-xs text-muted-foreground">PNG, JPG, JPEG</p>
          </div>
        )}
      </Dropzone>
    </div>
  );
}
