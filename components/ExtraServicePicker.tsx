"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Service } from "@/types";

const ExtraServicePicker = ({
  services,
  onComplete,
  setIsDialogOpen,
  carType,
}: any) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [moreInfoSelected, setMoreInfoSelected] = useState<Service[]>([]);

  const handleClick = (
    serviceId: string,
    serviceName: string,
    price: number
  ) => {
    if (selectedServices.includes(serviceId)) {
      // Remove id from array
      setSelectedServices((prevIds) =>
        prevIds.filter((id) => id !== serviceId)
      );
      // Also remove from moreInfoSelected
      setMoreInfoSelected((prevData) =>
        prevData.filter((info) => info.serviceId !== serviceId)
      );
    } else {
      // Add id to array
      setSelectedServices((prevIds) => [...prevIds, serviceId]);
      // Add new info to moreInfoSelected
      const newInfo: Service = {
        serviceName,
        serviceId,
        price,
      };
      setMoreInfoSelected((prevData) => [...prevData, newInfo]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <ScrollArea className="mt-4 h-[500px] w-full">
        {services.map((service: any, index: number) => {
          if (service.detail[carType] && "price" in service.detail[carType]) {
            return (
              <Button
                key={service.serviceId}
                className={`mb-2  flex w-full justify-between bg-slate-500  ${selectedServices.includes(service.serviceId) ? "border-2 border-mclaren-orange" : "border-0"}`}
                onClick={() =>
                  handleClick(
                    service.serviceId,
                    service.serviceName,
                    service.detail[carType].price
                  )
                }
              >
                <p className="text-wrap text-left ">
                  {" "}
                  {service.serviceName.includes(".")
                    ? service.serviceName.substring(
                        service.serviceName.indexOf(" ") + 1
                      )
                    : service.serviceName}
                </p>
                <p className="font-bold text-dark-blue">
                  ${service.detail[carType].price}
                </p>
              </Button>
            );
          } else {
            return "";
          }
        })}
      </ScrollArea>
      <Button
        onClick={() => {
          onComplete(
            { extraServices: moreInfoSelected },
            "extraServiceSelected"
          );
          setIsDialogOpen(false);
        }}
        disabled={selectedServices.length < 1}
        className="mt-2 w-[320px] bg-rolex-green"
      >
        Confirm
      </Button>
    </div>
  );
};

export default ExtraServicePicker;
