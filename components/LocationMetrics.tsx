import React from "react";
import DatePicker from "@/components/DatePicker";
import Image from "next/image";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  };
  date: string;
}

const LocationMetrics = ({ info, date }: props) => {
  return (
    <div className=" flex w-full flex-col items-center bg-navy-blue pb-3 pt-6">
      <div className="flex w-full justify-center gap-6">
        <div className="flex flex-col items-center">
          <h3 className="text-[35px] font-bold">{`$${info.totalSales.toLocaleString().split(".")[0]}`}</h3>
          <p className="mt-[-5px] text-[12px] text-[#F4F5F980]">Total Sales</p>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-[35px] font-bold">$80,000</h3>
          <p className="mt-[-5px] text-[12px] text-[#F4F5F980]">Monthly Goal</p>
        </div>
      </div>
      <div className="mt-5 flex w-full items-center justify-center gap-5">
        <DatePicker pDate={date} />
        <Image
          src="/icons/filter-icon.svg"
          width={25}
          height={25}
          alt="credit-card-icon"
        />
        {/* <Button className="size-1 rounded-full bg-light-blue">X</Button> */}
      </div>

      {/* <div className="mx-5 flex w-"> */}
      <div className="mt-4 flex w-[340px] justify-evenly rounded-[10px] bg-white py-3">
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
          {/* <HoverCard>
            <HoverCardTrigger className="text-black">
              <div className="flex items-center gap-1">
                <Image
                  src="/icons/money_yellow.svg"
                  width={32}
                  height={27}
                  alt="credit-card-icon"
                />
                <p className="text-[13px] text-dark-blue">${info.totalTips}</p>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="bg-navy-blue text-white ">
              <div className="flex flex-col items-center justify-center">
                <p>CASH: $15.99</p>
                <p>CREDIT: $15.99</p>
              </div>
            </HoverCardContent>
          </HoverCard> */}
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
    </div>
  );
};

export default LocationMetrics;
