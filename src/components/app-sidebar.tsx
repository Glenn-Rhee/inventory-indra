"use client";

import * as React from "react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboardIcon,
  ListIcon,
  ChartBarIcon,
  FolderIcon,
  DatabaseIcon,
  FileChartColumnIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Products",
      url: "/products",
      icon: <ListIcon />,
    },
    {
      title: "Stocks",
      url: "/stocks",
      icon: <ChartBarIcon />,
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: <FolderIcon />,
    },
  ],
  documents: [
    {
      name: "Data Products",
      icon: <DatabaseIcon />,
    },
    {
      name: "Reports",
      icon: <FileChartColumnIcon />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  if (
    pathname !== "/" &&
    pathname !== "/products" &&
    pathname !== "/stocks" &&
    pathname !== "/transactions" &&
    pathname !== "/settings"
  ) {
    return null;
  }
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="mt-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <Image
                  src={"/logo-icon.png"}
                  alt="Logo Indra Farma"
                  width={60}
                  height={40}
                />
                <Image
                  src={"/logo-text.png"}
                  alt="Logo Indra Farma"
                  width={90}
                  height={40}
                />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
