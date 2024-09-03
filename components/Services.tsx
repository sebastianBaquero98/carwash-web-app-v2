"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ServicePicker from "./ServicePicker";

const Service = ({ services, orderData, carType, onComplete }: any) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex gap-3">
      <div className="ms-[-15px] mt-1  w-[310px]  items-center rounded-r-[20px] border-[7px] border-light-blue bg-light-blue">
        <div className="ms-1 flex w-[290px] flex-col gap-2 rounded-r-[18px] bg-[#000] py-2">
          {orderData.serviceGroupId === "" && orderData.serviceId === "" ? (
            <p className="ms-[38px] text-sm">No Service Added</p>
          ) : (
            <div className="flex h-[42px] w-[280px] items-center justify-between rounded-lg bg-white">
              <p className="ms-[40px] text-[15px] font-bold  tracking-[9%] text-dark-blue">
                {orderData.serviceName}
              </p>
            </div>
          )}
        </div>
      </div>
      <Dialog open={isDialogOpen}>
        <DialogTrigger>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="mt-2 size-[37px] items-center justify-center rounded-[10px] bg-light-blue text-center text-[10px]"
          >
            Add
          </Button>
        </DialogTrigger>
        <DialogContent className="rounded-lg border-2 border-mclaren-orange bg-dark-blue ">
          <DialogHeader className="text-dark-blue">
            <DialogTitle className="text-white">Service Picker</DialogTitle>
          </DialogHeader>
          <ServicePicker
            services={services}
            carType={carType}
            onComplete={onComplete}
            setIsDialogOpen={setIsDialogOpen}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Service;
