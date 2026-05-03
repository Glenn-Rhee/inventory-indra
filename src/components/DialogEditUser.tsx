"use client";
import { PencilIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import UploadImage from "./UploadImage";
import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import ResponseError from "@/error/ResponseError";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";
import { useSession } from "next-auth/react";
import { ResponsePayload } from "@/types";
import { useImageUrl } from "@/store/image-url-store";
const BASEURL = process.env.NEXT_PUBLIC_BASE_SERVER_URL;

export default function DialogEditUser() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const { startUpload, isUploading } = useUploadThing("imageUpload", {
    onUploadProgress: (p) => setUploadProgress(p),
  });
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setImageUrl } = useImageUrl();
  const handleSubmit = async () => {
    try {
      const uploaded = await startUpload(files);
      if (!uploaded || uploaded.length === 0) {
        throw new ResponseError(
          500,
          "Something went wrong while upload file. Please try again later!",
        );
      }

      setIsLoading(true);
      const res = await fetch(BASEURL + "/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: session?.user.id,
          imageUrl: uploaded[0].ufsUrl,
        }),
      });

      const dataRes = (await res.json()) as ResponsePayload;
      if (dataRes.status === "failed") {
        throw new ResponseError(res.status, dataRes.message);
      }

      toast.success("Successfully update your profile image!");
      setOpenDialog(false);
      setImageUrl(uploaded[0].ufsUrl);
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
      } else {
        toast.error("An error occured, please try again later!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
          size="icon"
        >
          <PencilIcon className="size-3" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload user image</DialogTitle>
          <DialogDescription>
            Upload your profile image for best experience. Click save when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <UploadImage
          uploadProgress={uploadProgress}
          isUploading={isUploading}
          files={files}
          setFiles={setFiles}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button
            disabled={isUploading || isLoading}
            type="button"
            onClick={handleSubmit}
          >
            {isUploading ? (
              <>
                <Spinner /> Uploading your file...
              </>
            ) : isLoading ? (
              <>
                <Spinner /> Saving your changes...
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
