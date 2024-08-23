import { getClientGarage } from "@/lib/actions/client.actions";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Car from "./Car";
import React from "react";

interface props {
  accesstoken: string;
  garageId: string;
}

const GarageScrollArea = async ({ accesstoken, garageId }: props) => {
  let cars;
  if (accesstoken && garageId) {
    // console.log("entro");
    cars = await getClientGarage(accesstoken, garageId);
    // console.log("entro 1");
  }
  //   console.log(cars);
  if (cars) {
    return (
      <ScrollArea className="h-[215px] rounded-md ">
        {cars.map((car: any) => (
          <Car key={car} />
        ))}
      </ScrollArea>
    );
  } else {
    return "";
  }
};

export default GarageScrollArea;
