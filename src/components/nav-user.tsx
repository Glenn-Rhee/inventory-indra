"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { EllipsisVerticalIcon, LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";
import DialogEditUser from "./DialogEditUser";
import { useImageUrl } from "@/store/image-url-store";

export function NavUser() {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const { data: session } = useSession();
  const { imageUrl, setImageUrl } = useImageUrl();

  async function handleLogout() {
    try {
      await signOut();
      setImageUrl("");
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
      toast.error("An error while logout");
    }
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {session ? (
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={imageUrl || session.user.imageUrl || ""}
                    alt={session.user.username + " Profile"}
                  />
                  <AvatarFallback className="rounded-lg">
                    {session.user.username?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <Skeleton className="h-8 w-8 rounded-lg aspect-square" />
              )}
              {session ? (
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {session.user.username}
                  </span>
                </div>
              ) : (
                <Skeleton className="h-1.5 w-3/4" />
              )}
              <EllipsisVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="py-0 pe-4 font-normal flex items-center justify-between">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                {session ? (
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={imageUrl || session.user.imageUrl || ""}
                      alt={session.user.username + " Profile" || ""}
                    />
                    <AvatarFallback className="rounded-lg">
                      {session.user.username?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <Skeleton className="h-8 w-8 rounded-lg aspect-square grayscale" />
                )}
                {session ? (
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {session.user.username}
                    </span>
                  </div>
                ) : (
                  <Skeleton className="h-1.5 w-3/4" />
                )}
              </div>
              <DialogEditUser />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              variant="destructive"
              className="text-sm"
            >
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
