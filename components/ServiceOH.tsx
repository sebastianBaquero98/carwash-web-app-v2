import React from "react";

const ServiceOH = ({ order }: any) => {
  return (
    <div className="flex h-[42px] w-[280px] items-center justify-between rounded-lg bg-white">
      <p className="ms-[40px] text-[15px] font-bold  tracking-[9%] text-dark-blue">
        {order.serviceName.includes(".")
          ? order.serviceName.split(".")[1]
          : order.serviceName}
      </p>
      <div className="me-5 flex flex-col items-center text-[10px] text-dark-blue">
        <p>{`$${order.price}`}</p>
        <div className="rounded-md border-2 border-rolex-green px-[5px] py-[0.3px]">
          <p>{`$${order.lastPriceGiven}`}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceOH;
