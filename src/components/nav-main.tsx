"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
  }[];
}) {
  const pathname = usePathname();
  return (
    <SidebarGroup className="mt-4">
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu className="flex flex-col gap-y-1">
          {items.map((item) => (
            <Link key={item.title} href={item.url}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className={cn(
                    "min-w-8 py-6 duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground",
                    item.url === pathname &&
                      "bg-primary/90 text-primary-foreground",
                  )}
                  tooltip={item.title}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
