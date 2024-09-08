import React, { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
// import { Bar, BarChart, ResponsiveContainer } from "recharts";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

// const data = [
//   {
//     goal: 400,
//   },
//   {
//     goal: 300,
//   },
//   {
//     goal: 200,
//   },
//   {
//     goal: 300,
//   },
//   {
//     goal: 200,
//   },
//   {
//     goal: 278,
//   },
//   {
//     goal: 189,
//   },
//   {
//     goal: 239,
//   },
//   {
//     goal: 300,
//   },
//   {
//     goal: 200,
//   },
//   {
//     goal: 278,
//   },
//   {
//     goal: 189,
//   },
//   {
//     goal: 349,
//   },
// ];

const TimePicker = () => {
  const [hour, setHour] = useState(-1);
  const [minutes, setMinutes] = useState(-1);
  const [timeDay, setTimeDay] = useState("");
  const [time, setTime] = useState("00:00");

  const handleSetHour = (hour: string, index: number) => {
    const minutes = time.split(":")[1];
    let h = hour;
    if (hour.length === 1) {
      h = `0${hour}`;
    }
    setHour(index);
    setTime(`${h}:${minutes}`);
  };

  const handleSetMinute = (minute: string, index: number) => {
    const hour = time.split(":")[0];
    let m = minute;
    if (minute.length === 1) {
      m = `0${minute}`;
    }
    setMinutes(index);
    setTime(`${hour}:${m}`);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="h-[30px] rounded-md border-dark-blue bg-[#DEE2E9] text-[10px] text-dark-blue"
        >
          {time === "00:00" ? "Estimated Pickup Time" : time}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="border-mclaren-orange bg-dark-blue">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Time Picker</DrawerTitle>
            <DrawerDescription>Select Estimated Pickup Time</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              {/* <Button
                variant="outline"
                size="icon"
                className="size-8 shrink-0 rounded-full"
                onClick={() => onClick(-10)}
                disabled={goal <= 200}
              >
                <Minus className="size-4" />
                <span className="sr-only">Decrease</span>
              </Button> */}
              <div className="flex flex-col items-center text-center">
                <div className="flex items-end justify-center text-7xl font-bold tracking-tighter">
                  <p>{time}</p>
                  <p className="text-[13px] tracking-normal text-mclaren-orange">
                    {timeDay}
                  </p>
                </div>
                <div className="text-center text-[0.70rem] uppercase">Time</div>
              </div>

              {/* <Button
                variant="outline"
                size="icon"
                className="size-8 shrink-0 rounded-full"
                onClick={() => onClick(10)}
                disabled={goal >= 400}
              >
                <Plus className="size-4" />
                <span className="sr-only">Increase</span>
              </Button> */}
            </div>
            <div className="mx-5 flex flex-col">
              <h3 className="mb-2">Hour</h3>
              <div className="mb-3 grid grid-cols-6 gap-2">
                {[
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                ].map((h, i) => (
                  <Button
                    onClick={() => handleSetHour(h, i)}
                    key={h}
                    className={`h-[35px] w-[10px] border border-white ${i === hour ? "border-mclaren-orange" : ""}`}
                  >
                    {h}
                  </Button>
                ))}
              </div>
              <h3 className="mb-2">Minute</h3>
              <div className="mb-3 grid grid-cols-6 gap-2">
                {[
                  "5",
                  "10",
                  "15",
                  "20",
                  "25",
                  "30",
                  "35",
                  "40",
                  "45",
                  "50",
                  "55",
                ].map((m, i) => (
                  <Button
                    onClick={() => handleSetMinute(m, i)}
                    key={m}
                    className={`h-[35px] w-[10px] border border-white ${i === minutes ? "border-mclaren-orange" : ""}`}
                  >
                    {m}
                  </Button>
                ))}
              </div>
              <h3 className="mb-2">Time of the Day</h3>
              <div className="flex gap-2">
                <Button
                  onClick={() => setTimeDay("AM")}
                  className={`h-[35px] w-[10px] border border-white ${timeDay === "AM" ? "border-mclaren-orange" : ""}`}
                >
                  AM
                </Button>
                <Button
                  onClick={() => setTimeDay("PM")}
                  className={`h-[35px] w-[10px] border border-white ${timeDay === "PM" ? "border-mclaren-orange" : ""}`}
                >
                  PM
                </Button>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Submit</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default TimePicker;
