"use client";
import React, { useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { useUserStore } from "@/store/user-store";

interface ProvidersProps {
  children: React.ReactNode;
  user: Session["user"] | null;
}

export default function Providers(props: ProvidersProps) {
  const { children, user } = props;
  const { setUser } = useUserStore();

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);
  return (
    <SessionProvider>
      <TooltipProvider>
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SiteHeader />
            {children}
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </SessionProvider>
  );
}
