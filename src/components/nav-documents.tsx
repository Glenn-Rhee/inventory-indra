"use client";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import ResponseError from "@/error/ResponseError";
import { fetchExcelFile } from "@/helper/fetchExcelFile";
import { BASEURL } from "@/lib/product-queries";
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
    const userId = session?.user.id ?? "";
    if (!itemName.toLowerCase().includes("reports")) {
      setItemClick(itemName);
      try {
        await fetchExcelFile(
          BASEURL + "/stats/medicine",
          userId,
          "Data-Obat.xlsx",
        );
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
    } else {
      setItemClick(itemName);
      try {
        await fetchExcelFile(
          BASEURL + "/stats/reports",
          userId,
          "Data-Reports.xlsx",
        );

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
