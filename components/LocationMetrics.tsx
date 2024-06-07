import React from "react";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/DatePicker";

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
}

const LocationMetrics = ({ info }: props) => {
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
        <DatePicker />
        <Button className="size-1 rounded-full bg-light-blue">!</Button>
      </div>

      {/* <div className="mx-5 flex w-"> */}
      <div className="mt-4 flex w-[340px] justify-evenly rounded-[10px] bg-white py-3">
        <div className="flex flex-col items-center">
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
        </div>
      </div>
    </div>
  );
};

export default LocationMetrics;
