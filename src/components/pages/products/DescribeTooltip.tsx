import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";

interface DescribeTooltipProps {
  describe: string;
}

export default function DescribeTooltip(props: DescribeTooltipProps) {
  const { describe } = props;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <CircleHelp className="size-4 text-muted-foreground cursor-pointer" />
      </TooltipTrigger>
      <TooltipContent>{describe}</TooltipContent>
    </Tooltip>
  );
}
