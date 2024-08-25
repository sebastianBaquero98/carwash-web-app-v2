import React from "react";
import { Button } from "./ui/button";

const ServicePicker = ({ services, carType }: any) => {
  //   console.log("this is servies", services);
  return (
    <div className="flex flex-col gap-2">
      {services.map((service: any) => {
        if (service.detail[carType] && "price" in service.detail[carType]) {
          return (
            <Button
              key={service.id}
              className="flex  justify-between bg-slate-500"
            >
              <p className="text-wrap text-left">
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
    </div>
  );
};

export default ServicePicker;
