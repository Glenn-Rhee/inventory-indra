"use client";

import * as React from "react";
import { format } from "date-fns";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (...event: unknown[]) => void;
}

export function DatePicker(props: DatePickerProps) {
  const { date, setDate } = props;
  const [isActive, setIsActive] = React.useState(false);
  const now = new Date();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          onClick={() => setIsActive((prev) => !prev)}
          className="w-53 bg-transparent hover:bg-transparent justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
        >
          {date ? format(date, "PPP") : <span>Pick a date</span>}
          {isActive ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          defaultMonth={date}
          captionLayout="dropdown"
          startMonth={new Date(now.getFullYear(), 0)}
          endMonth={new Date(now.getFullYear() + 10, 0)}
        />
      </PopoverContent>
    </Popover>
  );
}
