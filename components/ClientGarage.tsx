"use client";
import React, { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import Image from "next/image";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Button } from "./ui/button";
import { deleteCarFromGarage } from "@/lib/actions/client.actions";
import { useToast } from "@/hooks/use-toast";

const ClientGarage = ({ accessToken, data, onComplete, cars }: any) => {
  const { toast } = useToast();

  const [stateCars, setStateCars] = useState(cars);
  const [isSelected, setIsSelected] = useState(cars.length === 1 ? 0 : -1);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteCarId, setDeleteCarId] = useState("");
  // const [selectedDelete, setSelectedDelete] = useState(-1);

  const handleSelect = (
    index: number,
    carId: string,
    carTypeId: string,
    carTypeName: string,
    id: string
  ) => {
    if (!isDelete) {
      const data = {
        carId,
        carTypeId,
        carTypeName,
      };
      onComplete(data);
      setIsSelected(index);
    } else {
      setDeleteCarId(carId);
      setDeleteId(id);
      setIsSelected(index);
    }
  };

  const handleDelete = async () => {
    const updatedItems = stateCars.filter((_: any, i: any) => i !== isSelected);
    setStateCars(updatedItems);
    setIsDelete(false);
    setIsSelected(-1);
    await deleteCarFromGarage(accessToken, deleteId, deleteCarId);
    toast({
      title: "DELETE CONFIRMED",
      description: "Deleted car from clients car garage",
    });
  };
  return (
    <div
      className={`ms-[-15px] mt-1  w-[310px]  items-center rounded-r-[20px] border-[7px] ${isSelected !== -1 && !isDelete ? "border-rolex-green bg-rolex-green" : !isDelete ? "border-light-blue bg-light-blue" : "border-ferrari-red bg-ferrari-red"} `}
    >
      <div className="ms-1 flex w-[290px] flex-col gap-2 rounded-r-[18px] bg-[#000] py-2">
        <div className="flex justify-between">
          <Popover>
            <PopoverTrigger>
              <p className="ms-[38px] text-[17px] font-bold">
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
            {!isDelete && (
              <Image
                src="/icons/add_car_icon.svg"
                width={25}
                height={25}
                alt="credit-card-icon"
              />
            )}
            {!isDelete && (
              <Image
                src="/icons/delete_car_icon.svg"
                width={25}
                height={25}
                alt="credit-card-icon"
                onClick={() => setIsDelete(true)}
              />
            )}

            {isDelete && (
              <Button
                onClick={handleDelete}
                disabled={isSelected === -1 || cars.length === 1}
                className="ms-6 h-[30px] w-[120px] bg-ferrari-red text-[12px]"
              >
                Confirm Delete
              </Button>
            )}
          </div>
        </div>

        <ScrollArea className="h-[215px] rounded-md ">
          {stateCars.map((car: any, index: number) => (
            <button
              onClick={() =>
                handleSelect(
                  index,
                  car.carId,
                  car.carType,
                  car.carTypeName,
                  car.id
                )
              }
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
