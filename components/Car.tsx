"use client";
import Image from "next/image";
import React from "react";

const Car = ({ car }: any) => {
  return (
    <div className="mb-2 flex h-[65px] w-[280px] rounded-lg bg-white py-2">
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
        <p className="text-[15px] font-bold tracking-[9%]">{car.carMake}</p>
        <p className="text-[16px]">{car.carTypeName}</p>
      </div>
    </div>
  );
};

export default Car;
