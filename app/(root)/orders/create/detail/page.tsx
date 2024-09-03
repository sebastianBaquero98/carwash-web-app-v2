"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const OrderDetail = () => {
  const [selectedDiscount, setIsSelectedDiscount] = useState("");

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-1 text-[17px]">Order Detail</h1>
      <div className="flex w-[323px] flex-col items-center justify-center gap-2 rounded-[20px] border-8 border-light-blue p-2">
        <div className="flex h-[82px] w-[285px] justify-between rounded-[10px] bg-[#F4F5F9] px-4">
          <div className="flex h-full flex-col justify-center">
            <p className=" text-[17px] font-bold text-dark-blue ">
              Jean Carlos
            </p>
            <p className="text-[10px] text-dark-blue">j.carlos@gmail.com</p>
            <p className="text-[10px] text-dark-blue">+11234567890</p>
          </div>
          <Image
            src="/icons/filter-icon.svg"
            width={25}
            height={25}
            alt="credit-card-icon"
          />
        </div>
        <div className="flex  w-[285px] flex-col items-center rounded-[10px] bg-[#F4F5F9] py-2">
          <h2 className="text-[25px] font-black text-dark-blue">$62.99</h2>
          <p className="text-[14px] text-dark-blue">Total Value</p>
          <h2 className="mt-2 text-[14px] font-bold text-dark-blue">SUV</h2>
          <p className="text-[12px] text-dark-blue">Interior Splash</p>
          <p className="text-[12px] font-light text-dark-blue">+Bug Removal</p>
          {/* <p className="h-[20px] w-[104px] bg-[#DEE2E9]">r</p> */}
          <Input
            placeholder="Pick up Time"
            className="mt-3 h-[28px] w-[104px] border-dark-blue bg-[#DEE2E9] text-center align-middle text-dark-blue placeholder:text-[9px] placeholder:text-dark-blue focus:outline-none  focus:ring-2 focus:ring-blue-300"
          />
          <div className="mt-3 flex justify-center gap-1">
            <Button
              onClick={() => setIsSelectedDiscount("FIXED")}
              className={`h-[28px] border-2 border-rolex-green text-[10px] text-rolex-green ${selectedDiscount === "FIXED" ? " bg-rolex-green text-white" : ""}`}
            >
              FIXED
            </Button>
            <Button
              onClick={() => setIsSelectedDiscount("PERCENTAGE")}
              className={`h-[28px] border-2 border-rolex-green text-[10px] text-rolex-green ${selectedDiscount === "PERCENTAGE" ? " bg-rolex-green text-white" : ""}`}
            >
              PERCENTAGE
            </Button>
            <Input
              placeholder="amount"
              className="h-[28px] w-[78px] border-dark-blue bg-[#DEE2E9] text-center align-middle text-dark-blue placeholder:text-[10px] placeholder:text-dark-blue focus:outline-none  focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <Textarea
            className="mt-3 h-[59px] w-[255px] rounded-[10px] border-dark-blue bg-[#DEE2E9] text-dark-blue placeholder:text-[10px] placeholder:text-dark-blue"
            placeholder="Add Comment"
          />
        </div>
      </div>
      <Button className="mt-5 w-4/5 rounded-lg border-8 border-rolex-green tracking-[9%]">
        Confirm
      </Button>
    </div>
  );
};

export default OrderDetail;
