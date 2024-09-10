"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

const ServicePicker = ({
  services,
  carType,
  onComplete,
  setIsDialogOpen,
}: any) => {
  //   console.log("this is servies", services);
  const [selectedService, setSelectedService] = useState(-1);
  const [pData, setData] = useState({});

  const handleSelect = (
    index: number,
    serviceGroupId: string,
    serviceId: string,
    serviceName: string,
    price: number
  ) => {
    setSelectedService(index);
    const data = {
      serviceGroupId,
      serviceId,
      serviceName,
      price,
    };
    setData({ service: data });
    // onComplete(data, "services");
  };
  return (
    <div className="flex flex-col gap-2">
      <ScrollArea className="mt-4 h-[500px] w-full">
        {services.map((service: any, index: number) => {
          if (service.detail[carType] && "price" in service.detail[carType]) {
            return (
              <Button
                key={service.id}
                className={`mb-2  flex w-full justify-between bg-slate-500  ${selectedService === index ? "border-2 border-mclaren-orange" : "border-0"}`}
                onClick={() =>
                  handleSelect(
                    index,
                    service.serviceGroupId,
                    service.serviceId,
                    service.serviceName,
                    service.detail[carType].price
                  )
                }
              >
                <p className="text-wrap text-left">
                  {" "}
                  {service.serviceName.includes(".")
                    ? service.serviceName.substring(
                        service.serviceName.indexOf(" ") + 1
                      )
                    : service.serviceName}
                </p>
                <p className="font-medium text-dark-blue">
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
          onComplete(pData, "serviceSelected");
          setIsDialogOpen(false);
        }}
        disabled={selectedService === -1}
        className="mt-2 w-[320px] bg-rolex-green"
      >
        Confirm
      </Button>
    </div>
  );
};

export default ServicePicker;
