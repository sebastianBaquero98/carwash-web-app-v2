"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// interface DateSelectorProps {
//   onDateSelect: (date: string) => void;
// }

const DatePicker = () => {
  const [date, setDate] = useState(new Date());
  // Lo que hare es agregar el parametro a la URL de la fecha seleccionada por el cliente
  // const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const date = event.target.value;
  //   setDate(date);
  //   onDateSelect(date);
  // };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[170px] border-[3px] border-light-blue h-[35px] justify-center items-center rounded-xl bg-white text-dark-blue text-left font-normal text-[12px]",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 size-3" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          className="bg-white text-dark-blue"
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
