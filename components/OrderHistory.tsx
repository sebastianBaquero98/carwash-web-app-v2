import React from "react";
import ServiceOH from "./ServiceOH";

const OrderHistory = ({ history }: any) => {
  return (
    <div className="ms-[-15px] mt-1  w-[310px]  items-center rounded-r-[20px] border-[7px] border-light-blue bg-light-blue">
      <div className="ms-1 flex w-[290px] flex-col gap-2 rounded-r-[18px] bg-[#000] py-2">
        {history.map((order: any, index: number) => (
          <ServiceOH key={index} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
