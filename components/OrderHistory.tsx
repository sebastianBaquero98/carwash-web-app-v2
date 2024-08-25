import React from "react";
import ServiceOH from "./ServiceOH";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ServicePicker from "./ServicePicker";

const OrderHistory = ({ history, services, carType }: any) => {
  console.log("carType", carType);
  return (
    <div className="flex gap-3">
      <div className="ms-[-15px] mt-1  w-[310px]  items-center rounded-r-[20px] border-[7px] border-light-blue bg-light-blue">
        <div className="ms-1 flex w-[290px] flex-col gap-2 rounded-r-[18px] bg-[#000] py-2">
          {history.map((order: any, index: number) => (
            <ServiceOH key={index} order={order} />
          ))}
        </div>
      </div>
      <Dialog>
        <DialogTrigger>
          <Button className="mt-2 size-[37px] items-center justify-center rounded-[10px] bg-light-blue text-center text-[10px]">
            Other
          </Button>
        </DialogTrigger>
        <DialogContent className="rounded-lg border-2 border-mclaren-orange bg-dark-blue">
          <DialogHeader>
            <DialogTitle>Service Picker</DialogTitle>
            {/* <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription> */}
          </DialogHeader>
          <ServicePicker services={services} carType={carType} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderHistory;
