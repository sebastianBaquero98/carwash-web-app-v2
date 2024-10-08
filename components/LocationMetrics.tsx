"use client";
import React from "react";
import DatePicker from "@/components/DatePicker";
import Image from "next/image";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import FilterButton from "./FilterButton";

interface props {
  info: {
    date: string;
    id: string;
    late: number;
    tipsInCash: number;
    tipsInCredit: number;
    totalCars: number;
    totalCarsInProgress: number;
    totalCash: number;
    totalComissions: number;
    totalCredit: number;
    totalPendingCars: number;
    totalSales: number;
    totalTips: number;
    progress: number;
    position: number;
    averageTicket: string;
  };
  date: string;
}

const LocationMetrics = ({ info, date }: props) => {
  return (
    <div className=" flex w-full flex-col items-center bg-navy-blue py-2">
      <div className="flex w-full justify-center gap-6">
        <div className="flex flex-col items-center">
          <h3 className="text-[35px] font-bold">{`$${info.totalSales.toLocaleString().split(".")[0]}`}</h3>
          <p className="mt-[-5px] text-[12px] text-[#F4F5F980]">Total Sales</p>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-[35px] font-bold">${info.averageTicket}</h3>
          <p className="mt-[-5px] text-[12px] text-[#F4F5F980]">
            Average Ticket
          </p>
        </div>
      </div>
      <div className="mt-3 flex w-full items-center justify-center gap-5">
        <DatePicker pDate={date} />
        <FilterButton />
      </div>

      <div className="mt-3 flex w-[340px] justify-evenly rounded-[10px] bg-white py-1">
        <div className="flex flex-col justify-items-center">
          <div className="flex items-center gap-1">
            <Image
              src="/icons/money_red.svg"
              width={32}
              height={27}
              alt="credit-card-icon"
            />
            <p className="text-[13px] text-dark-blue ">${info.totalCredit}</p>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src="/icons/money_green.svg"
              width={32}
              height={27}
              alt="credit-card-icon"
            />
            <p className="text-[13px] text-dark-blue">${info.totalCash}</p>
          </div>
          <Popover>
            <PopoverTrigger>
              <div className="flex items-center gap-1">
                <Image
                  src="/icons/money_yellow.svg"
                  width={32}
                  height={27}
                  alt="credit-card-icon"
                />
                <p className="text-[13px] text-dark-blue">${info.totalTips}</p>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[180px] justify-center border-mclaren-orange bg-navy-blue">
              <div className="flex flex-col items-center justify-center">
                <p className="text-sm">{`CASH: $${info.tipsInCash}`}</p>
                <p className="text-sm">{`CREDIT: $${info.tipsInCredit}`}</p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center">
          <div className="flex flex-col items-center">
            <Image
              src="/icons/car_light_blue.svg"
              width={52}
              height={36}
              alt="credit-card-icon"
            />
            <p className="text-[16px] text-dark-blue">{info.totalCars}</p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/icons/car_green.svg"
              width={52}
              height={36}
              alt="credit-card-icon"
            />
            <p className="text-[16px] text-dark-blue">
              {info.totalCarsInProgress}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/icons/car_white.svg"
              width={52}
              height={36}
              alt="credit-card-icon"
            />
            <p className="text-[16px] text-dark-blue">
              {info.totalPendingCars}
            </p>
          </div>
        </div>
        {/* <div className="flex flex-col items-center">
          <p className="text-dark-blue">{info.totalCars}</p>
          <p className="text-dark-blue">|</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-dark-blue">{info.totalCarsInProgress}</p>
          <p className="text-dark-blue">|</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-dark-blue">{info.totalPendingCars}</p>
          <p className="text-dark-blue">|</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-dark-blue">{info.totalTips}</p>
          <p className="text-dark-blue">|</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-dark-blue">{info.totalCash}</p>
          <p className="text-dark-blue">|</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-dark-blue">{info.totalCredit}</p>
          <p className="text-dark-blue">|</p>
        </div> */}
      </div>

      {/* <div className="bg-black">1</div> */}
      <div className="flex w-full items-center justify-center gap-1">
        <div
          className={`mt-2 size-[25px] items-center justify-center rounded-full ${info.position <= 3 ? "bg-rolex-green" : info.position <= 6 ? "bg-light-blue" : "bg-ferrari-red"} `}
        >
          <p className="mt-[5px] text-center align-middle text-xs">
            {info.position}
          </p>
        </div>
        <div className="mt-2 h-4 w-4/5 items-center rounded-full bg-slate-500 ">
          <div
            className="flex h-4 items-center justify-center rounded-full p-0.5 text-center align-middle text-xs font-medium leading-none text-white"
            style={{
              width: info.progress + "%",
              backgroundImage:
                "linear-gradient(129deg, #7183e4 0%, #c66573 100%)",
            }}
          >
            {" "}
            {info.progress}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMetrics;
