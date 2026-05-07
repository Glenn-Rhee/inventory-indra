"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ResponseError from "@/error/ResponseError";
import { toast } from "sonner";
import { BASEURL } from "@/lib/product-queries";
import { useSession } from "next-auth/react";
import { ResponsePayload } from "@/types";
import { useQueryClient } from "@tanstack/react-query";

interface DialogDeleteProps {
  productId: string;
  productName: string;
}

export default function DialogDelete(props: DialogDeleteProps) {
  const { productId, productName } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(BASEURL + "/product?productId=" + productId, {
        method: "DELETE",
        headers: {
          "x-user-id": session?.user.id || "",
        },
      });

      const dataRes = (await res.json()) as ResponsePayload;
      if (dataRes.status === "failed") {
        throw new ResponseError(res.status, dataRes.message);
      }

      toast.success(dataRes.message);
      setOpen(false);

      queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
      } else {
        toast.error("An error occured! Please try again later!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (isLoading) return;
        setOpen(v);
      }}
    >
      <DialogTrigger
        onClick={() => setOpen(true)}
        className="w-full text-start"
      >
        <span>Delete</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-bold">{productName}</span>? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={isLoading} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleDelete}
            disabled={isLoading}
            variant="destructive"
          >
            {isLoading ? "Deleting ..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
