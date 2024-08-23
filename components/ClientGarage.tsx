"use client";
import React, { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import Image from "next/image";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";

const ClientGarage = ({ data, onComplete, cars }: any) => {
  const [isSelected, setIsSelected] = useState(-1);

  const handleSelect = (index: number, carId: string, carTypeId: string) => {
    setIsSelected(index);
    const data = {
      carId,
      carTypeId,
    };
    onComplete(data, "orderHistory");
  };
  return (
    <div className="ms-[-15px] mt-1  w-[310px]  items-center rounded-r-[20px] border-[7px] border-light-blue bg-light-blue">
      <div className="ms-1 flex w-[290px] flex-col gap-2 rounded-r-[18px] bg-[#000] py-2">
        <div className="flex justify-between">
          <Popover>
            <PopoverTrigger>
              <p className=" ms-[45px] text-[17px] font-bold">
                {data.clientName.split(" ")[0]}
              </p>
            </PopoverTrigger>
            <PopoverContent className="justify-center border-mclaren-orange bg-navy-blue px-4">
              <div className="flex flex-col items-center justify-center">
                <p className="text-sm">{data.clientName}</p>
                {data.clientEmail !== "" ? (
                  <p className="text-sm">{data.clientEmail}</p>
                ) : (
                  <p>NA</p>
                )}
              </div>
            </PopoverContent>
          </Popover>
          <div className="me-5 flex gap-2">
            <div className="size-[22px] rounded-full bg-rolex-green"></div>
            <div className="size-[22px] rounded-full bg-renualt-yellow"></div>
            <div className="size-[22px] rounded-full bg-ferrari-red"></div>
          </div>
        </div>

        <ScrollArea className="h-[215px] rounded-md ">
          {cars.map((car: any, index: number) => (
            <button
              onClick={() => handleSelect(index, car.carId, car.carType)}
              key={car.carId}
            >
              <div
                className={`mb-2 flex h-[65px] w-[280px] rounded-lg bg-white py-2 ${isSelected === index ? "border-2 border-mclaren-orange" : ""}`}
              >
                <Image
                  src={`https://carwash-car-make-images.s3.amazonaws.com/${car.carMake}.png`}
                  height={30}
                  width={50}
                  alt="nissan logo"
                  className="ms-[15px]"
                />
                <div
                  style={{ backgroundColor: car.carColor }}
                  className="mx-3 inline-block h-full min-h-[1em] w-[15px] rounded-2xl border-2 border-light-blue"
                ></div>
                <div className="flex flex-col justify-center text-dark-blue">
                  <p className="text-[15px] font-bold tracking-[9%]">
                    {car.carMake}
                  </p>
                  <p className="text-[16px]">{car.carTypeName}</p>
                </div>
              </div>
            </button>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};

export default ClientGarage;
