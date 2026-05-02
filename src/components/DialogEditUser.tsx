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

export default function DialogEditUser() {
  return (
    <Dialog>
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
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button type="button">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
