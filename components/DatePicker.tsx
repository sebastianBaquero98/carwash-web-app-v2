"use client";
import React, { useState, useTransition } from "react";
import { format } from "date-fns";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import moment from "moment";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface props {
  pDate: string;
}

const DatePicker = ({ pDate }: props) => {
  const [date, setDate] = useState(new Date(pDate + "T00:00:00"));
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Lo que hare es agregar el parametro a la URL de la fecha seleccionada por el cliente
  const handleSelectDate = (event: any) => {
    const params = new URLSearchParams(searchParams);
    const filterParams = searchParams.get("isFilter");
    if (filterParams) {
      params.delete("isFilter");
    }
    if (event) {
      const formattedDate: string = moment(event).format("YYYY-MM-DD");
      params.set("date", formattedDate);
    } else {
      params.delete("date");
    }
    setDate(new Date(event));
    if (event) {
      setOpen(false);
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });

    // replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative inline-block">
          <Button
            variant={"outline"}
            className={cn(
              "w-[170px] border-[3px] border-light-blue h-[35px] justify-center items-center rounded-xl bg-white text-dark-blue text-left font-normal text-[12px] tracking-wide",
              !date && "text-muted-foreground"
            )}
            disabled={isPending}
          >
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
          {isPending && (
            <span className="absolute -right-1 -top-1 flex size-4">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-mclaren-orange opacity-75"></span>
              <span className="relative inline-flex size-4 rounded-full bg-mclaren-orange"></span>
            </span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          className="bg-white text-dark-blue"
          mode="single"
          selected={date}
          onSelect={handleSelectDate}
          initialFocus
          disabled={isPending}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
