"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import Cards from "./Cards";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

export default function SectionCardsStocks() {
  const isMobile = useIsMobile();
  return (
    <div className="grid grid-cols-1 gap-3 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-3 dark:*:data-[slot=card]:bg-card">
      {isMobile ? (
        <Collapsible>
          <CollapsibleTrigger className="w-full flex items-center justify-between">
            <span>Lihat Detail</span>
            <ChevronDown className="size-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Cards />
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <Cards />
      )}
    </div>
  );
}
