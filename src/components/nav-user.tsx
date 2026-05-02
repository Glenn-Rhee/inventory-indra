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
import { useUserStore } from "@/store/user-store";
import { EllipsisVerticalIcon, LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";

export function NavUser() {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const { user: dataUser } = useUserStore();
  async function handleLogout() {
    try {
      await signOut();
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
              {dataUser ? (
                <Avatar className="h-8 w-8 rounded-lg grayscale">
                  <AvatarImage
                    src={dataUser.imageUrl || ""}
                    alt={dataUser.username + " Profile"}
                  />
                  <AvatarFallback className="rounded-lg">
                    {dataUser?.username?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <Skeleton className="h-8 w-8 rounded-lg aspect-square grayscale" />
              )}
              {dataUser ? (
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {dataUser.username}
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
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={dataUser?.imageUrl || ""}
                    alt={dataUser?.username + " Profile" || ""}
                  />
                  <AvatarFallback className="rounded-lg">
                    {dataUser?.username?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {dataUser?.username}
                  </span>
                </div>
              </div>
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
