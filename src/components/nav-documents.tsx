"use client";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import ResponseError from "@/error/ResponseError";
import { BASEURL } from "@/lib/product-queries";
import { ResponsePayload } from "@/types";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
export function NavDocuments({
  items,
}: {
  items: {
    name: string;
    icon: React.ReactNode;
  }[];
}) {
  const { data: session } = useSession();
  const [itemClick, setItemClick] = useState<string | null>(null);
  async function handleDownloadExcelFile(itemName: string) {
    if (!itemName.includes("reports")) {
      setItemClick(itemName);
      try {
        const res = await fetch(BASEURL + "/stats/medicine", {
          method: "GET",
          headers: {
            "x-user-id": session?.user.id || "",
          },
        });

        if (!res.ok) {
          const dataRes = (await res.json()) as ResponsePayload;

          throw new ResponseError(res.status, dataRes.message);
        }

        const disposition = res.headers.get("Content-Disposition");
        const fileName = disposition
          ? disposition.split("filename=")[1]
          : "data-obat.xlsx";
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
        toast.success("File downloaded!");
      } catch (error) {
        if (error instanceof ResponseError) {
          toast.error(error.message);
        } else {
          toast.error("An error occured. Please try again later!");
        }
      } finally {
        setItemClick(null);
      }
    }
  }
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Documents</SidebarGroupLabel>
      <SidebarMenu className="flex flex-col">
        {items.map((item) => (
          <SidebarMenuItem className="py-2" key={item.name}>
            <SidebarMenuButton
              onClick={async () => await handleDownloadExcelFile(item.name)}
              className="py-6 cursor-pointer"
              asChild
            >
              <div>
                {item.name === itemClick ? (
                  <Loader2 className="size-4 animate-spin text-primary" />
                ) : (
                  item.icon
                )}
                <span>{item.name}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
